import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Input from "../Components/Input";
import Select from "../Components/Select";
import api from "../services/api";
import categoryService from "../services/categoryService";
import productService from "../services/productService";
import Category from "./Category";
import debounce from "lodash.debounce";

const Products = () => {
  const [count, setCount] = useState(10);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [files, setFiles] = useState(null);
  const numberProduct = products?.slice(0, count);

  const defaultImgUrl =
    "https://restfulapi.dnd-group.net/public/photo-icon.png";
  const [imagePreview, setImagePreview] = useState(defaultImgUrl);
  const inputFileRef = useRef();

  const [modalShow, setModalShow] = useState(false);
  const handleModalClose = () => setModalShow(false);
  const handleModalShow = () => setModalShow(true);

  // CALLING API
  const getAllData = () => {
    const productList = productService.list();
    const categoryList = categoryService.list();

    api.promise([productList, categoryList]).then(
      api.spread((...res) => {
        setProducts(res[0].data);
        setCategories(res[1].data);
      })
    );
  };

  useEffect(() => {
    getAllData();
  }, []);

  // DELETE
  const handleDelete = (e, id) => {
    e.preventDefault();
    productService.delete(id).then((res) => {
      if (res.errorCode === 0) {
        getAllData();
        toast.success("Xóa Sản Phẩm Thành Công !.");
      } else {
        toast.error("Xóa Sản Phẩm Thất Bại !.");
      }
    });
  };

  // HANDLE SAVE

  const handleSave = (data) => {
    const formData = new FormData();
    for (const key in data) formData.append(key, data[key]);
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    if (data.id === 0) {
      productService.add(formData).then((res) => {
        if (res.errorCode === 0) {
          getAllData();
          handleModalClose();
          toast.success("Thêm Sản Phẩm Thành Công !");
        } else {
          toast.error(res.message);
        }
      });
    } else {
      productService.update(data.id, formData).then((res) => {
        if (res.errorCode === 0) {
          getAllData();
          handleModalClose();
          toast.success("Cập Nhật Sản phẩm Thành Công!");
        } else toast.error(res.message);
      });
    }
  };

  // formik

  const formik = useFormik({
    initialValues: {
      id: 0,
      brand: "",
      name: "",
      description: "",
      price: 0,
      sale: 10,
      amount: 0,
      images: undefined,
      categoryId: 0,
    },
    validationSchema: Yup.object({
      id: Yup.number().required(),
      brand: Yup.string().required("Hãy Nhập Nhãn Hiệu"),
      name: Yup.string()
        .required("Hãy Nhập Tên Sản Phẩm")
        .min(3, "At least 3 characters"),
      description: Yup.string().required("Hãy Nhập Mô Tả Sản Phẩm"),
      price: Yup.number().required("Hãy Nhập Giá Tiền").min(100000),
      amount: Yup.number().required("Hãy Nhập Số Lượng Sản Phẩm"),
      categoryId: Yup.number().required("Hãy Chọn Danh Mục Sản Phẩm"),
    }),
    onSubmit: (values) => {
      handleSave(values);
    },
  });

  // Open Modal

  const showEdit = (e, product) => {
    if (e) e.preventDefault();
    if (product.id > 0) {
      setImagePreview(product.imageArr[1]);
      productService.get(product.id).then((res) => {
        if (res.errorCode === 0) {
          formik.setValues(res.data);
          handleModalShow();
        }
      });
    } else {
      setImagePreview(defaultImgUrl);
      formik.resetForm();
      handleModalShow();
    }
  };

  // inputFileRef

  const handleChangeImage = (e) => {
    if (e.target.files) {
      setImagePreview(URL.createObjectURL(e.target.files[1]));
      setFiles(e.target.files);
    }
  };

  // get Category Name
  const getCategoryName = (list, categoryId) => {
    const category = list.filter((item) => item.id === categoryId);
    return category[0].name;
  };

  const handleNumberProduct = (e) => {
    setCount(Number(e.target.value));
  };
  // debounce search
  const debounceSearch = debounce((e) => {
    productService.search(e.target.value).then((res) => {
      setProducts(res.data);
    });
  }, 1000);

  const handleSearchProduct = (e) => {
    debounceSearch(e);
  };

  return (
    <>
      <Card className="border-primary bt-5 m-4">
        <Card.Header>
          <Row>
            <Col>
              <h3 className="card-title">Danh Sách Sản Phẩm</h3>
            </Col>
            <Col xs="auto">
              <Button variant="primary" onClick={() => showEdit(null, 0)}>
                <i className="bi bi-plus-circle pe-1"></i> Add
              </Button>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          {/* navbar in table */}
          <div className="row">
            <div className="col">
              <div className="g-1 row">
                <label className="col-form-label col-sm-auto">Hiển Thị</label>
                <div className="col-sm-auto">
                  <select
                    onChange={handleNumberProduct}
                    value={count}
                    className="form-select"
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>
                <label className="col-form-label col-sm-auto">Sản Phẩm</label>
              </div>
            </div>

            {/* Add category */}
            <div className="col-3">
              <Category />
            </div>

            <div className="col-auto">
              <input
                onChange={handleSearchProduct}
                placeholder="Tìm Kiếm Sản Phẩm..."
                className="form-control"
                type="text"
              />
            </div>
          </div>

          {/* table content */}
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered border-primary">
                <thead>
                  <tr className="table-primary border-primary text-center align-middle">
                    <th style={{ width: "5%" }}>#</th>
                    <th style={{ width: "5%" }}>ID</th>
                    <th style={{ width: "10%" }}>Thương hiệu</th>
                    <th style={{ width: "15%" }}>Tên sản phẩm</th>
                    <th>Hình ảnh</th>
                    <th style={{ width: "5%" }}>Số lượng</th>
                    <th style={{ width: "10%" }}>Giá</th>
                    <th style={{ width: "10%" }}>Khuyến mãi</th>
                    <th style={{ width: "8%" }}>Danh mục</th>
                    <th style={{ width: "8%" }} />
                  </tr>
                </thead>

                <tbody className="border-primary">
                  {numberProduct.map((product, index) => (
                    <tr key={product.id}>
                      <td className="align-middle text-center">{index + 1}</td>
                      <td className="align-middle text-center">{product.id}</td>
                      <td className="align-middle text-center">
                        {product.brand}
                      </td>
                      <td className="align-middle text-center fs-5">
                        {product.name}
                      </td>
                      <td className="align-middle text-center">
                        {product.imageArr.map((image) => (
                          <img
                            className="f-lex flex-wrap"
                            key={image}
                            src={image}
                            alt="failed"
                            style={{
                              width: "40px",
                              height: "40px",
                              objectFit: "contain",
                            }}
                          />
                        ))}
                      </td>
                      <td className="align-middle text-center">
                        {product.amount}
                      </td>
                      <td className="align-middle text-center">
                        {product.price}
                      </td>
                      <td className="align-middle text-center">
                        {product.sale}
                      </td>
                      <td className="align-middle text-center">
                        {getCategoryName(categories, product.categoryId)}
                      </td>
                      <td className="text-center align-middle">
                        <a
                          href="/#"
                          className="me-1"
                          onClick={(e) => showEdit(e, product)}
                        >
                          <i className="bi-pencil-square text-primary"></i>
                        </a>
                        <a
                          href="/#"
                          onClick={(e) => handleDelete(e, product.id)}
                        >
                          <i className="bi-trash text-danger"></i>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* <!-- Modal product--> */}
      <Modal
        show={modalShow}
        onHide={handleModalClose}
        backdrop="static"
        size="xl"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {formik.values.id > 0 ? "Cập Nhật" : "Thêm Mới"} Sản Phẩm
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm="4" className="text-center">
              <img
                src={imagePreview}
                alt=""
                className="img-thumbnail rounded border-dark d-block"
              />
              <input
                ref={inputFileRef}
                type="file"
                accept="image/*"
                className="d-none"
                onChange={handleChangeImage}
                multiple
              />
              <div className="mt-3">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => inputFileRef.current.click()}
                >
                  Thay Đổi
                </Button>
              </div>
            </Col>
            <Col sm>
              <Input
                type="text"
                id="txtBrand"
                label="Nhãn Hiệu"
                maxLength="30"
                required
                frmField={formik.getFieldProps("brand")}
                err={formik.touched.brand && formik.errors.brand}
                errMessage={formik.errors.brand}
                autoComplete="off"
              />
              <Input
                type="text"
                id="txtName"
                label="Tên"
                required
                frmField={formik.getFieldProps("name")}
                err={formik.touched.name && formik.errors.name}
                errMessage={formik.errors.name}
                autoComplete="off"
              />

              <Input
                type="text"
                id="txtSale"
                label="Sale"
                maxLength="30"
                required
                frmField={formik.getFieldProps("sale")}
                err={formik.touched.sale && formik.errors.sale}
                errMessage={formik.errors.sale}
                autoComplete="off"
              />

              <div className="row mb-3">
                <div className="col-sm col-lg-12">
                  <Input
                    type="number"
                    id="txtAmount"
                    label="Số Lượng"
                    maxLength="30"
                    required
                    frmField={formik.getFieldProps("amount")}
                    err={formik.touched.amount && formik.errors.amount}
                    errMessage={formik.errors.amount}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm col-lg-12 ">
                  <Input
                    type="text"
                    id="txtPrice"
                    label="Giá Tiền"
                    maxLength="30"
                    required
                    frmField={formik.getFieldProps("price")}
                    err={formik.touched.price && formik.errors.price}
                    errMessage={formik.errors.price}
                  />

                  <Select
                    id="drpCategoryId"
                    label="Danh mục"
                    values={categories}
                    required
                    lastRow
                    frmField={formik.getFieldProps("categoryId")}
                    err={formik.touched.categoryId && formik.errors.categoryId}
                    errMessage={formik.errors.categoryId}
                  />
                </div>
              </div>
            </Col>
          </Row>

          {/* CKEditor */}
          <label className="mb-3">Mô tả: </label>
          <CKEditor
            data={formik.values.description}
            name="description"
            editor={Editor}
            onBlur={(event, editor) => {
              const data = editor.getData();
              formik.setFieldValue("description", data);
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={formik.handleSubmit}
            disabled={!formik.dirty || !formik.isValid}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Products;
