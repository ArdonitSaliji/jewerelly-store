// $("#goog-gt-tt").css("display", "none");

// let basketItem = $(".basketItem");

// let basket = $(".basketIndicator");

// let basket3 = $(".basketIndicator").text();

// let emptyBasket = $(".emptyBasket");

// let basket2 = 0;

// let value = localStorage.getItem("basket");
// $(".remove").click(function remove() {
//   if (value > 1) {
//     value = value - 1;
//     $(".emptyBasket").css("display", "none");
//     $(".basketItem").css("display", "inline-block");
//     $(".basketIndicator").text(value);
//     if (addToBasket2()) {
//       $(".basketItem 2").css("display", "inline-block");
//     }

//     localStorage.setItem("basket", value.toString());
//   } else {
//     localStorage.setItem("basket", "0");

//     $(".basketIndicator").css("display", "none");
//     $(".emptyBasket").css("display", "block");
//     $(".basketItems").css("display", "none");
//   }
// });

// $(function () {
//   if (value != 0) {
//     $(".basketIndicator").css("display", "inline-block");

//     $(".basketIndicator").text(value);
//     localStorage.setItem("basket", value.toString());
//   } else {
//     $(".basketIndicator").css("display", "none");
//     $(".emptyBasket").css("display", "block");
//     $(".basketItems").css("display", "none");
//   }
// });

// function addToBasket() {
//   let quantity = $("#quantity").val();

//   if (quantity > 0) {
//     $(".basketIndicator").css("display", "inline-block");
//     basket2 = basket2 + 1;
//     localStorage.setItem("basket", basket2.toString());
//     $(".basketIndicator").text(basket2);

//     hideSphere();
//   }
//   if (quantity == "") {
//     $("#quantity").css("border", "2px solid red");
//   }
// }

// function addToBasket2() {
//   let quantity = $("#quantity").val();

//   if (quantity > 0) {
//     $(".basketIndicator").css("display", "inline-block");
//     basket2 = basket2 + 1;
//     localStorage.setItem("basket", basket2.toString());
//     $(".basketIndicator").text(basket2);

//     hideSphere2();
//   }
//   if (quantity == "") {
//     $("#quantity").css("border", "2px solid red");
//   }
// }

// $(".karatInput").keyup(function () {
//   $(".karatPriceShown").text("Price: $" + this.value * 25);
// });
// $(".fa-solid").click(function () {
//   $(".karatInput").val("");
//   $(".karatPriceShown").text("Price: ");
// });
// function forgot() {
//   window.open("forgot.html", "_self");
// }
// function cancel() {
//   window.open("indextext.html", "_self");
// }

// function clickLime() {
//   window.open("citrine.html");
// }
// function showSphere() {
//   $(".buyContent").show(600);
// }
// function showSphere2() {
//   $(".buyContentRaw").show(600);
// }
// function hideSphere2() {
//   $(".buyContentRaw").css("display", "none");
//   $("#quantity").val("");
//   $("#quantity").css("border", "none");
// }

// function hideSphere() {
//   $(".buyContent").css("display", "none");
//   $("#quantity").val("");
//   $("#quantity").css("border", "none");
// }

// function logIn() {
//   $(".log-in").show(600);
//   $(".sign-up").hide();
//   $(".buyContent").hide();
//   var element = document.getElementById("container1");
//   element.style.opacity = 0.3;
// }

// function signUp() {
//   $(".sign-up").show(500);
//   $(".log-in").hide();
//   $(".buyContent").hide();
//   var element = document.getElementById("container1");
//   element.style.opacity = 0.3;
// }

// function cancelLogIn() {
//   $(".log-in").hide();
//   $("#login-username").css("border", "none").val("");
//   $("#pass").css("border", "none").val("");
//   $("#loginStatus").text("");
//   var element = document.getElementById("container1");
//   element.style.opacity = 1;
// }
// function cancelSignUp() {
//   $(".sign-up").hide();
//   $("#check-pass").text("");
//   $("#username").css("border", "none").val("");
//   $("#pass1").css("border", "none").val("");
//   $("#againPass").css("border", "none").val("");
//   var element = document.getElementById("container1");
//   element.style.opacity = 1;
// }

// function getInfo() {
//   var obj = {};

//   var username = $("#username").val();
//   var pass = $("#pass1").val();
//   var againPass = $("#againPass").val();

//   obj.username = username;
//   obj.pass = pass;
//   obj.againPass = againPass;

//   localStorage.setItem("obj", JSON.stringify(obj));
//   switch (true) {
//     case username == "":
//       $("#signUpButton").attr("type", "button");
//       $("#username").css("border", "2px solid red");
//       $("#check-pass").text("Enter your username!").css({
//         margin: "0 0 10px 0",
//         width: "220px",
//         transform: "translateX(135px)",
//       });
//       $("#already").css("margin", "0 0 80px 0");
//       break;

//     case pass == "":
//       $("#check-pass").text("Enter your password!").css({
//         margin: "0 0 10px 0",
//         width: "220px",
//         transform: "translateX(135px)",
//       });
//       $("#signUpButton").attr("type", "button");
//       $("#pass1").css("border", "2px solid red");

//       break;
//     case pass.length < 8:
//       $("#check-pass")
//         .text("Your password must be longer than 8 characters!")
//         .css({
//           margin: "0 0 10px 0",
//           width: "220px",
//           transform: "translateX(145px) translateY(-10px)",
//         });
//       $("#signUpButton").attr("type", "button");
//       $("#pass1").css("border", "2px solid red");

//       break;

//     case againPass == "":
//       $("#check-pass").text("Enter your password again!").css({
//         margin: "0 0 10px 0",
//         width: "270px",
//         transform: "translateX(110px)",
//       });
//       $("#signUpButton").attr("type", "button");
//       $("#againPass").css("border", "2px solid red");
//       break;

//     case pass != againPass:
//       $("#check-pass").text("Your passwords are not matching!").css({
//         margin: "0 0 10px 0",
//         width: "350px",
//         transform: "translateX(80px)",
//       });
//       $("#signUpButton").attr("type", "button");
//       $("#pass1 , #againPass").css("border", "2px solid red");
//       break;
//     default:
//       $("#signUpButton").attr("type", "submit");
//       break;
//   }
// }

// function loginButton() {
//   let information = localStorage.getItem("obj");
//   let informationObj = JSON.parse(information);
//   let password = $("#pass").val();
//   let username = $("#login-username").val();
//   console.log(informationObj);
//   switch (true) {
//     case username == "":
//       $("#login-username").css("border", "2px solid red");
//       $("#loginStatus").text("Enter your username!");
//       $("#btn-click").attr("type", "button");
//       $("#loginStatus").css({
//         margin: "10px 0 0 0",
//         transform: "translateY(5px)",
//       });
//       break;

//     case password == "":
//       $("#loginStatus").text("Enter your password!");
//       $("#pass").css("border", "2px solid red");
//       $("#btn-click").attr("type", "button");
//       $("#loginStatus").css({
//         margin: "10px 0 0 0",
//         transform: "translateY(5px)",
//       });
//       break;

//     case password.length < 8:
//       $("#loginStatus").text("Your password must be longer than 8 characters!");
//       $("#btn-click").attr("type", "button");
//       $("#loginStatus").css({
//         margin: "10px 0 0 0",
//         transform: "translateY(5px)",
//       });
//       break;

//     case password != informationObj.pass && username != informationObj.username:
//       $("#loginStatus").text("Your password or username is wrong!");
//       $("#btn-click").attr("type", "button");
//       $("#loginStatus").css({
//         margin: "10px 0 0 0",
//         transform: "translateY(5px)",
//       });
//       break;

//     default:
//       $("#btn-click").attr("type", "submit");
//       break;
//   }
// }
