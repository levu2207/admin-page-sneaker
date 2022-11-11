import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";
import CustomButton from "../Components/CustomButton";
import Input from "../Components/Input";

const Category = () => {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [isWaiting, seIsWaiting] = useState(false);

  const handleAddCateory = () => {
    setShowAddCategory(true);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .required("Hãy nhập tên danh mục")
        .min(3, "Tên danh mục ít nhất 3 ký tự"),
    }),

    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (e) => {
    seIsWaiting(true);
    console.log("danh muc");
    seIsWaiting(false);
  };

  return (
    <div>
      {/* add category */}

      <Button variant="primary" onClick={() => handleAddCateory()}>
        <i className="bi bi-plus-circle pe-1"></i> Thêm danh mục
      </Button>

      {/* Modal add category */}

      <Modal
        show={showAddCategory}
        onHide={() => setShowAddCategory(false)}
        backdrop="static"
        size="md"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm danh mục</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Input
            type="text"
            id="txtCategory"
            label="Tên danh mục"
            labelSize={4}
            maxLength="30"
            required
            frmField={formik.getFieldProps("name")}
            err={formik.touched.name && formik.errors.name}
            errMessage={formik.errors.name}
            autoComplete="off"
          />
        </Modal.Body>

        <Modal.Footer>
          <CustomButton
            color="primary"
            onClick={formik.handleSubmit}
            disabled={!formik.dirty || !formik.isValid || isWaiting}
            isLoading={isWaiting}
          >
            Lưu
          </CustomButton>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Category;
