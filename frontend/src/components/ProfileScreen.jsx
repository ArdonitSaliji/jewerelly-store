import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { toast } from "react-toastify";

// import "./ProfileScreen.css";
const ProfileScreen = () => {
  const [pic, setPic] = useState(process.env.PUBLIC_URL + "/images/user.webp");

  const [formState, setFormState] = useState({
    password1: "",
    password2: "",
    image: "",
  });
  const [firstFormState, setFirstFormState] = useState({
    password1: "",
    password2: "",
    image: "",
  });
  const isFormChanged = () => {
    // Checking if form input fields have been changed
    if (
      firstFormState.username === formState.username &&
      firstFormState.email === formState.email &&
      firstFormState.password1 === formState.password1 &&
      firstFormState.password2 === formState.password2 &&
      firstFormState.image === formState.image
    ) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    (async () => {
      const res = await fetch("/user/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: JSON.parse(sessionStorage.getItem("user")),
        }),
      });
      const json = await res.json();
      setFormState({
        ...formState,
        username: json.username,
        email: json.email,
        _id: json._id,
      });

      setFirstFormState({
        ...firstFormState,
        username: json.username,
        email: json.email,
      });
    })();
  }, []);
  const updateProfile = async () => {
    if (isFormChanged()) {
      if (formState.password1 !== formState.password2) {
        toast.error("Passwords are not matching!");
      } else {
        let username = formState.username;
        let email = formState.email;
        let password = formState.password1;
        let profileImage = formState.image;
        let _id = formState._id;
        const user = { username, email, password, profileImage, _id };

        const res = await fetch("/user/update-profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        const json = await res.json();
        console.log(json);
        if (res.status === 200) {
          sessionStorage.setItem("user", JSON.stringify(json.username));
          toast.success(json.message);
        } else if (res.status === 400) {
          toast.error(json.message);
        }
      }
    } else {
      toast.info("You have not changed any field");
    }
  };

  return (
    <Row className="profileContainer">
      <Col md={6}>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              defaultValue={formState.username}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  username: e.target.value,
                });
              }}
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              defaultValue={formState.email}
              onChange={(e) => {
                setFormState({
                  ...formState,
                  email: e.target.value,
                });
              }}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              onChange={(e) => {
                setFormState({
                  ...formState,
                  password1: e.target.value,
                });
              }}
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => {
                setFormState({
                  ...formState,
                  password2: e.target.value,
                });
              }}
            />
          </Form.Group>

          <Form.Group controlId="pic">
            <Form.Label>Change Profile Picture</Form.Label>
            <Form.Control
              type="file"
              label="Upload Profile Picture"
              onChange={(e) => {
                setFormState({
                  ...formState,
                  image: e.target.files[0],
                });
              }}
            />
          </Form.Group>
          <Button
            type="button"
            varient="primary"
            onClick={() => {
              updateProfile();
            }}
          >
            Update
          </Button>
        </Form>
      </Col>
      <Col>
        <img src={pic} className="profilePic" />
      </Col>
    </Row>
  );
};

export default ProfileScreen;
