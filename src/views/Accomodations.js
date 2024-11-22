import AddAccomodationModal from "components/Accomodation/AddAccomodationModal";
import EditAccomodation from "components/Accomodation/EditAccomodation";
import DeleteModal from "components/DeleteModal";
import OnlyHeader from "components/Headers/OnlyHeader";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardHeader,
  Container,
  Media,
  Row,
  Spinner,
  Table,
} from "reactstrap";
import { fetchMoreAccomodations } from "store/actions/AccomodationsActions";
import { deleteAccomodationAction } from "store/actions/AccomodationsActions";
import { getAllAccomodations } from "store/actions/AccomodationsActions";

const Accomodations = () => {
  const dispatch = useDispatch();
  const { accomodationLoading, accomdationData, loadMoreBtn } = useSelector(
    (state) => state.accomodation
  );
  const [accomodationModal, setAccomodationModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [ID, setID] = useState(null);
  const [singleAccomodation, setSingleAccomodation] = useState(null);
  const toggleModal = () => setAccomodationModal(!accomodationModal);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const toggleEdit = () => setEditModal(!editModal);

  useEffect(() => {
    dispatch(getAllAccomodations());
  }, []);
  const deleteAccomodation = () => {
    dispatch(
      deleteAccomodationAction(ID, () => {
        alert("Accomdation deleted successfully");
        toggleDeleteModal();
        setID(null);
      })
    );
  };

  return (
    <div>
      <OnlyHeader />
      <Container className="mt--7" fluid>
        <Row className="mb-5">
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="d-flex justify-content-between align-items-center flex-xs-column mx-3">
                  <h3 className="text-center text-xl-left">Accomodations</h3>
                  <Button color="primary" onClick={toggleModal}>
                    Add Accomodation
                  </Button>
                </Row>
              </CardHeader>
              {accomodationLoading ? (
                <Row className="d-flex py-4 justify-content-center">
                  <Spinner size="sm" />
                </Row>
              ) : (
                <>
                  {accomdationData.length > 0 ? (
                    <>
                      <Table
                        className="align-items-center table-flush"
                        responsive
                      >
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Title</th>
                            <th scope="col">City/Country</th>
                            <th scope="col">availabilty</th>
                            <th scope="col">price</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {accomdationData.length > 0 &&
                            accomdationData?.map((item, index) => (
                              <tr key={index}>
                                <th scope="row">
                                  <Media className="align-items-center">
                                    <Media>
                                      <span className="mb-0 text-sm">
                                        {item?.title}
                                      </span>
                                    </Media>
                                  </Media>
                                </th>

                                <td>
                                  {item.city} / {item.country}
                                </td>
                                <td>
                                  {item?.availibilty} {item?.availableFrom}
                                </td>
                                <td>
                                  {item.price} &nbsp;
                                  {item.currency}
                                </td>
                                <td>
                                  <Button
                                    color="primary"
                                    size="sm"
                                    onClick={() => {
                                      setSingleAccomodation(item);
                                      toggleEdit();
                                    }}
                                  >
                                    <i className="fas fa-pencil-alt" />
                                  </Button>
                                  <Button
                                    color="danger"
                                    className="mx-2"
                                    size="sm"
                                    onClick={() => {
                                      setID(item.id);
                                      toggleDeleteModal();
                                    }}
                                  >
                                    <i className="fa fa-trash"></i>
                                  </Button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                      <Row className="mx-3 justify-content-end my-3">
                        <Button
                          color="info"
                          disabled={loadMoreBtn}
                          onClick={() =>
                            dispatch(
                              fetchMoreAccomodations(
                                accomdationData[accomdationData.length - 1]
                              )
                            )
                          }
                        >
                          Load More
                        </Button>
                      </Row>
                    </>
                  ) : (
                    <Row className="d-flex justify-content-center py-4">
                      {" "}
                      No Accomodations Found
                    </Row>
                  )}
                </>
              )}
            </Card>
          </div>
        </Row>
      </Container>
      <AddAccomodationModal
        accomodationModal={accomodationModal}
        toggle={toggleModal}
      />
      <DeleteModal
        modal={deleteModal}
        toggle={toggleDeleteModal}
        title={"Accomodation"}
        deleteFunction={deleteAccomodation}
      />
      <EditAccomodation
        modal={editModal}
        toggle={toggleEdit}
        singleAccomodation={singleAccomodation}
      />
    </div>
  );
};

export default Accomodations;
