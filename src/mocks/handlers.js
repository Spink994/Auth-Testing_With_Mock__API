import { rest } from "msw";

let fakeDB = [];

export const handlers = [
  //================================= The Registration Endpoint ================================ //

  rest.post("/register", (req, res, ctx) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    const userInformation = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    };

    //Checking for empty fields
    const emptyField = Object.keys(userInformation).filter(
      (data) => userInformation[data] === ""
    );

    if (emptyField.length > 0 || password !== confirmPassword)
      return res(
        // Respond with a 400 status code
        ctx.status(400),
        ctx.text("Bad user credentials")
      );

    const isDataInLocalStorage = JSON.parse(localStorage.getItem("dummyDB"));
    if (isDataInLocalStorage) {
      fakeDB = [...isDataInLocalStorage, userInformation];
    }

    if (!isDataInLocalStorage) {
      fakeDB.push(userInformation);
    }

    localStorage.setItem("dummyDB", JSON.stringify(fakeDB));
    return res(
      // Respond with a 201 status code
      ctx.status(201)
    );
  }),

  // ======================================= The Login EndPoint ==================================== //

  //The login endpoint
  rest.post("/login", (req, res, ctx) => {
    const { email, password } = req.body;

    let token = "";

    //A dummy list of tokens for simulation
    const tokenArray = [
      "olat-1423-adea-bion-a428",
      "temi-1489-tayo-2872-a411",
      "roti-6485-mi23-0484-a222",
      "ifea-1553-nyi0-109n-a228",
    ];

    //Checking to find an email and password that matches the query
    if (email !== "" && password !== "") {
      const localDB = JSON.parse(localStorage.getItem("dummyDB"));
      const isRegistered = localDB
        ? localDB.find(
            (info) =>
              info.email.toLowerCase() === email.toLowerCase() &&
              info.password === password
          )
        : null;

      if (isRegistered !== null && isRegistered) {
        token = tokenArray[Math.floor(Math.random() * 4)];

        // Persist user's authentication in the session
        sessionStorage.setItem("token", token);
        return res(
          ctx.json({ token }),
          ctx.delay(3000),
          // Respond with a 200 status code
          ctx.status(200)
        );
      }
    }

    return res(
      ctx.text("User not found"),
      ctx.json({ message: "User not found" }),
      ctx.status(404)
    );
  }),
];
