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
import { deleteMessageAction } from "store/actions/MessagesAction";
import { updateMessageStatus } from "store/actions/MessagesAction";
import { getMessages } from "store/actions/MessagesAction";

const Messages = () => {
  const dispatch = useDispatch();
  const { messagesData, messagesLoading } = useSelector(
    (state) => state.messages
  );
  const [ID, setID] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  useEffect(() => {
    dispatch(getMessages());
  }, []);

  const deleteMessage = () => {
    dispatch(
      deleteMessageAction(ID, () => {
        alert("Message deleted successfully");
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
                  <h3 className="text-center text-xl-left">Messages</h3>
                </Row>
              </CardHeader>
              {messagesLoading ? (
                <Row className="d-flex py-4 justify-content-center">
                  <Spinner size="sm" />
                </Row>
              ) : (
                <>
                  {messagesData.length > 0 ? (
                    <Table
                      className="align-items-center table-flush"
                      responsive
                    >
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">user</th>
                          <th scope="col">message</th>
                          <th scope="col">response status</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {messagesData.length > 0 &&
                          messagesData?.map((item, index) => (
                            <tr key={index}>
                              <th scope="row">
                                <Media className="align-items-center">
                                  <Media>
                                    <span className="mb-0 text-sm">
                                      {item?.email}
                                    </span>
                                  </Media>
                                </Media>
                              </th>

                              <td>{item.message}</td>
                              <td className="text-capitalize">
                                {item.responseStatus}
                              </td>
                              <td>
                                <Button
                                  color="primary"
                                  size="sm"
                                  disabled={item.responseStatus == "responded"}
                                  onClick={() => {
                                    dispatch(
                                      updateMessageStatus(item.id, "responded")
                                    );
                                  }}
                                >
                                  Responded
                                  {/* <i className="fas fa-pencil-alt" /> */}
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
                  ) : (
                    <Row className="d-flex justify-content-center py-4">
                      {" "}
                      No Messages Found
                    </Row>
                  )}
                </>
              )}
            </Card>
          </div>
        </Row>
        <DeleteModal
          modal={deleteModal}
          toggle={toggleDeleteModal}
          title={"Message"}
          deleteFunction={deleteMessage}
        />
      </Container>
    </div>
  );
};

export default Messages;
