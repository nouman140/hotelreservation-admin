import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Button,
  Spinner,
} from "reactstrap";
// core components
import OnlyHeader from "components/Headers/OnlyHeader.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getReservations } from "store/actions/ReservationActions";
import { getAllAccomodations } from "store/actions/AccomodationsActions";
import { updateReservation } from "store/actions/ReservationActions";
import DeleteModal from "components/DeleteModal";
import { deleteReservationAction } from "store/actions/ReservationActions";

const Reservation = () => {
  const dispatch = useDispatch();
  const { reservationData, reservationLoading } = useSelector(
    (state) => state.reservation
  );
  const { accomdationData } = useSelector((state) => state.accomodation);
  const [ID, setID] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  useEffect(() => {
    dispatch(getReservations());
    dispatch(getAllAccomodations());
  }, []);

  const getAccomodation = (id) => {
    const found = accomdationData.find((item) => item.id == id);
    return found?.title;
  };

  const deleteReservation = () => {
    dispatch(
      deleteReservationAction(ID, () => {
        alert("Reservation deleted successfully");
        toggleDeleteModal();
        setID(null);
      })
    );
  };

  return (
    <>
      <OnlyHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Reservation</h3>
              </CardHeader>
              {reservationLoading ? (
                <Row className="d-flex py-4 justify-content-center">
                  <Spinner size="sm" />
                </Row>
              ) : (
                <>
                  {reservationData.length > 0 ? (
                    <Table
                      className="align-items-center table-flush"
                      responsive
                    >
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">accomodation</th>
                          <th scope="col">User</th>
                          <th scope="col">Check in</th>
                          <th scope="col">Check out</th>
                          <th scope="col">checkedIn Status</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reservationData.length > 0 &&
                          reservationData?.map((item, index) => (
                            <tr key={index}>
                              <th scope="row">
                                <Media className="align-items-center">
                                  <Media>
                                    <span className="mb-0 text-sm">
                                      {getAccomodation(item.accomodationID)}
                                    </span>
                                  </Media>
                                </Media>
                              </th>

                              <td>{item.userName}</td>
                              <td>{item.reservationDates.checkinDate}</td>
                              <td>{item.reservationDates.checkoutDate}</td>
                              <td className="text-capitalize">
                                {item.checkedInStatus}
                              </td>
                              <td>
                                {item?.checkedInStatus == "pending" ? (
                                  <Button
                                    color="primary"
                                    size="sm"
                                    onClick={() => {
                                      dispatch(
                                        updateReservation(item.id, "checkedin")
                                      );
                                    }}
                                  >
                                    Check In
                                  </Button>
                                ) : (
                                  <Button
                                    color="primary"
                                    size="sm"
                                    disabled={
                                      item.checkedInStatus == "checkedout"
                                    }
                                    onClick={() => {
                                      dispatch(
                                        updateReservation(item.id, "checkedout")
                                      );
                                    }}
                                  >
                                    Check Out
                                    {/* <i className="fas fa-pencil-alt" /> */}
                                  </Button>
                                )}

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
                  ) : (
                    <Row className="d-flex justify-content-center py-4">
                      {" "}
                      No Reservation Found
                    </Row>
                  )}
                </>
              )}

              {/* <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter> */}
            </Card>
          </div>
        </Row>
        <DeleteModal
          modal={deleteModal}
          toggle={toggleDeleteModal}
          title={"Reservation"}
          deleteFunction={deleteReservation}
        />
      </Container>
    </>
  );
};

export default Reservation;
