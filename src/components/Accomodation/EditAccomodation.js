import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Spinner,
} from "reactstrap";
import { updateAccomodationActions } from "store/actions/AccomodationsActions";
import { addAccomodationActions } from "store/actions/AccomodationsActions";

let initialFormData = {
  title: "",
  availibilty: "immediate booking",
  availableFrom: "",
  type: "appartment",
  price: "",
  currency: "€",
  city: "",
  country: "united kingdom",
  address: "",
};

const EditAccomodation = ({ modal, toggle, singleAccomodation }) => {
  const dispatch = useDispatch();
  const { accomodationLoading } = useSelector((state) => state.accomodation);
  const [formData, setFormData] = useState(initialFormData);
  const [propertyImages, setpropertyImages] = useState([]);
  useEffect(() => {
    if (singleAccomodation) {
      setFormData(singleAccomodation);
      setpropertyImages(singleAccomodation?.images);
    }
  }, [singleAccomodation]);

  const currencyOptions = [
    {
      name: "EUR",
      value: "€",
    },
    {
      name: "GBP",
      value: "£",
    },
    { name: "USD", value: "$" },
    { name: "SEK", value: "SEK" },
  ];
  const types = ["appartment", "flat", "studio", "room"];
  const countries = [
    "united kingdom",
    "spain",
    "italy",
    "sweden",
    "switzerland",
    "france",
    "natherlands",
    "germany",
  ];
  const availabiltyOptions = [
    "available from",
    "immediate booking",
    "booked until",
  ];

  const addAccomodation = (e) => {
    e.preventDefault();
    const emptyKeys = Object.keys(formData).filter(
      (key) => key !== "availableFrom" && formData[key] === ""
    );

    if (emptyKeys.length > 0) {
      // Alert user about empty keys
      alert(`Please fill in all required fields.`);
      return; // Stop further execution
    }
    // Check if images array has length greater than 0
    if (propertyImages.length === 0) {
      alert("Please add at least one image.");
      return; // Stop further execution
    }
    let payload = {
      ...formData,
      images: propertyImages,
    };
    dispatch(
      updateAccomodationActions(payload, () => {
        alert("Accomodation Updated");
        setFormData(initialFormData);
        setpropertyImages([]);
        toggle();
      })
    );
  };

  const handleImageChange = (e) => {
    if (propertyImages.length >= 5) {
      alert("max 5 images can be selected");
    } else {
      const files = e.target.files;
      Array.from(files)?.map((file) => {
        setpropertyImages((prev) => [...prev, file]);
      });
    }
  };

  const handleImageClick = () => {
    document.getElementById("fileInput").click();
  };
  const removeImage = (index) => {
    const updatedPreviews = [...propertyImages];
    updatedPreviews.splice(index, 1);
    setpropertyImages(updatedPreviews);
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Update Accomodation</ModalHeader>
      <ModalBody className="py-0">
        <Form onSubmit={addAccomodation}>
          <Row>
            <Col className="col-12 col-md-6">
              <FormGroup>
                <Label for="exampleEmail">Title</Label>
                <Input
                  value={formData.title}
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  id="exampleEmail"
                  name="title"
                  placeholder="Accomodation Title"
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col className="col-12 col-md-6">
              <FormGroup>
                <Label for="exampleEmail">Type</Label>
                <Input
                  required
                  id="exampleEmail"
                  name="City"
                  placeholder="City"
                  type="select"
                  className="text-capitalize"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                >
                  {types.map((item) => {
                    return (
                      <option value={item} className="text-capitalize">
                        {item}
                      </option>
                    );
                  })}
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label for="exampleEmail">Full Address</Label>
                <Input
                  required
                  id="exampleEmail"
                  name="Address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="Address"
                  type="textarea"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col className="col-12 col-md-6">
              <FormGroup>
                <Label for="exampleEmail">Country</Label>
                <Input
                  required
                  id="exampleEmail"
                  name="country"
                  placeholder="Country"
                  className="text-capitalize"
                  type="select"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                >
                  {countries.map((item) => {
                    return (
                      <option value={item} className="text-capitalize">
                        {item}
                      </option>
                    );
                  })}
                </Input>
              </FormGroup>
            </Col>
            <Col className="col-12 col-md-6">
              <FormGroup>
                <Label for="exampleEmail">City</Label>
                <Input
                  required
                  id="exampleEmail"
                  name="City"
                  placeholder="City"
                  type="text"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
              </FormGroup>
            </Col>
          </Row>
          <div>
            <Label>Accomodation Images</Label>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              multiple
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <Row className="my-3">
              {propertyImages.length > 0 &&
                propertyImages.map((preview, index) => (
                  <Col className="col-3 mb-2 position-relative">
                    <div
                      className="position-absolute image_remove_x"
                      onClick={() => removeImage(index)}
                    >
                      x
                    </div>
                    <img
                      src={
                        preview instanceof File
                          ? URL.createObjectURL(preview)
                          : preview
                      }
                      className="w-100 h-100"
                      alt={`Accommodation ${index + 1}`}
                    />
                  </Col>
                ))}
              <Col
                className="col-3 text-center cursor-pointer"
                onClick={handleImageClick}
              >
                <svg
                  width="65px"
                  height="65px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 21H9C6.17157 21 4.75736 21 3.87868 20.1213C3 19.2426 3 17.8284 3 15M21 15C21 17.8284 21 19.2426 20.1213 20.1213C19.8215 20.4211 19.4594 20.6186 19 20.7487"
                    stroke="#1C274C"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 16V3M12 3L16 7.375M12 3L8 7.375"
                    stroke="#1C274C"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Col>
            </Row>
          </div>

          <Row>
            <Col>
              <FormGroup>
                <Label>Availbilty</Label>
                <Input
                  required
                  type="select"
                  className="text-capitalize"
                  value={formData.availibilty}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      availibilty: e.target.value,
                    })
                  }
                >
                  {availabiltyOptions.map((item) => {
                    return (
                      <option value={item} className="text-capitalize">
                        {item}
                      </option>
                    );
                  })}
                </Input>
              </FormGroup>
            </Col>
          </Row>
          {formData.availibilty !== "immediate booking" && (
            <Row>
              <Col>
                <FormGroup>
                  <Label> Availbale From</Label>
                  <Input
                    type="date"
                    value={formData.availableFrom}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        availableFrom: e.target.value,
                      })
                    }
                  ></Input>
                </FormGroup>
              </Col>
            </Row>
          )}
          <Row>
            <Col className="col-12 col-md-6">
              <FormGroup>
                <Label> Price</Label>
                <Input
                  required
                  type="number"
                  min={0}
                  placeholder="00"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </FormGroup>
            </Col>
            <Col className="col-12 col-md-6">
              <FormGroup>
                <Label> Currency</Label>
                <Input
                  required
                  id="exampleSelect"
                  name="select"
                  type="select"
                  value={formData.currency}
                  onChange={(e) =>
                    setFormData({ ...formData, currency: e.target.value })
                  }
                >
                  {currencyOptions.map((item) => {
                    return <option value={item.value}>{item.name}</option>;
                  })}
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row className="justify-content-end my-3">
            <Button
              className="mx-3"
              type="button"
              color="danger"
              onClick={toggle}
            >
              Cancel
            </Button>
            <Button
              disabled={accomodationLoading}
              color="primary"
              type="submit"
            >
              {accomodationLoading ? (
                <Spinner size="sm" />
              ) : (
                "Update Accomodation"
              )}
            </Button>{" "}
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default EditAccomodation;
