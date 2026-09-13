const nameSetup =
  document.getElementById("nameSetup");

const nameSetupInput =
  document.getElementById("nameSetupInput");

const nameSetupButton =
  document.getElementById("nameSetupButton");

const nameInput =
  document.getElementById("name");

const userIdDisplay =
  document.getElementById("userid");


/* =======================================================
   PROFILE NAME ELEMENTS
   ======================================================= */

const profileNameInput =
  document.getElementById(
    "profileNameInput"
  );

const saveProfileNameButton =
  document.getElementById(
    "saveProfileNameButton"
  );


/* =======================================================
   PROFILE DESCRIPTION ELEMENTS
   ======================================================= */

const profileDescriptionInput =
  document.getElementById(
    "profileDescriptionInput"
  );

const profileDescriptionCounter =
  document.getElementById(
    "profileDescriptionCounter"
  );

const saveProfileDescriptionButton =
  document.getElementById(
    "saveProfileDescriptionButton"
  );


/* =======================================================
   USER ID
   ======================================================= */

let savedName = "";

try {

  window.userId =
    localStorage.getItem("userId");

  if (!window.userId) {

    window.userId =
      "USER-" +
      Date.now().toString(36) +
      "-" +
      Math.random()
        .toString(36)
        .substring(2, 10)
        .toUpperCase();

    localStorage.setItem(
      "userId",
      window.userId
    );

  }

} catch (error) {

  console.warn(
    "localStorage unavailable:",
    error
  );

  window.userId =
    "USER-" +
    Date.now().toString(36) +
    "-" +
    Math.random()
      .toString(36)
      .substring(2, 10)
      .toUpperCase();

}


userIdDisplay.textContent =
  window.userId;


/* =======================================================
   LOAD SAVED NAME FROM LOCAL STORAGE
   ======================================================= */

try {

  savedName =
    localStorage.getItem(
      "chatName"
    ) || "";

} catch (error) {

  console.warn(
    "localStorage unavailable:",
    error
  );

}


/* =======================================================
   SAVE USER NAME
   ======================================================= */

function saveUserName(name) {

  name =
    name.trim();

  if (!name) {
    return false;
  }


  if (name.length > 30) {
    return false;
  }


  savedName =
    name;

  nameInput.value =
    name;

  profileNameInput.value =
    name;


  try {

    localStorage.setItem(
      "chatName",
      name
    );

  } catch (error) {

    console.warn(
      "Could not save name:",
      error
    );

  }


  db.ref(
    "users/" +
    window.userId
  ).update({

    name:
      name,

    time:
      Date.now()

  })
  .catch(function(error) {

    console.error(
      "Could not save name to Firebase:",
      error
    );

  });


  return true;

}


/* =======================================================
   LOAD AND LISTEN TO SAVED PROFILE
   ======================================================= */

function loadOwnProfile() {

  userRefFor(
    window.userId
  )
    .on(
      "value",
      function(snapshot) {

        const data =
          snapshot.val() || {};


        /* =========================
           NAME
           ========================= */

        if (data.name) {

          savedName =
            data.name;

          nameInput.value =
            data.name;

          profileNameInput.value =
            data.name;


          try {

            localStorage.setItem(
              "chatName",
              data.name
            );

          } catch (error) {

            console.warn(
              "Could not update saved name:",
              error
            );

          }

        }


        /* =========================
           DESCRIPTION
           ========================= */

        const description =
          data.description || "";

        profileDescriptionInput.value =
          description;

        updateDescriptionCounter();

      },
      function(error) {

        console.error(
          "Could not load profile:",
          error
        );

      }
    );

}


/* =======================================================
   INITIAL NAME
   ======================================================= */

if (savedName) {

  nameInput.value =
    savedName;

  profileNameInput.value =
    savedName;

  nameSetup.style.display =
    "none";


  db.ref(
    "users/" +
    window.userId +
    "/name"
  ).set(
    savedName
  )
  .catch(function(error) {

    console.error(
      "Could not save initial name:",
      error
    );

  });

}


loadOwnProfile();


/* =======================================================
   NAME SETUP BUTTON
   ======================================================= */

nameSetupButton.addEventListener(
  "click",
  function() {

    if (
      saveUserName(
        nameSetupInput.value
      )
    ) {

      nameSetup.style.display =
        "none";

    }

  }
);


/* =======================================================
   NAME ENTER KEY
   ======================================================= */

nameSetupInput.addEventListener(
  "keydown",
  function(event) {

    if (
      event.key === "Enter"
    ) {

      if (
        saveUserName(
          nameSetupInput.value
        )
      ) {

        nameSetup.style.display =
          "none";

      }

    }

  }
);


/* =======================================================
   PROFILE NAME SAVE BUTTON
   ======================================================= */

saveProfileNameButton.addEventListener(
  "click",
  function() {

    const newName =
      profileNameInput.value.trim();


    if (!newName) {

      alert(
        "Please enter a name."
      );

      return;

    }


    if (newName.length > 30) {

      alert(
        "Name must be 30 characters or less."
      );

      return;

    }


    if (
      saveUserName(
        newName
      )
    ) {

      saveProfileNameButton.textContent =
        "Saved";


      setTimeout(
        function() {

          saveProfileNameButton.textContent =
            "Save Name";

        },
        1200
      );

    }

  }
);


/* =======================================================
   PROFILE NAME ENTER KEY
   ======================================================= */

profileNameInput.addEventListener(
  "keydown",
  function(event) {

    if (
      event.key === "Enter"
    ) {

      event.preventDefault();

      saveProfileNameButton.click();

    }

  }
);


/* =======================================================
   DESCRIPTION COUNTER
   ======================================================= */

function updateDescriptionCounter() {

  const length =
    profileDescriptionInput.value.length;

  profileDescriptionCounter.textContent =
    length +
    " / 300";

}


/* =======================================================
   DESCRIPTION INPUT
   ======================================================= */

profileDescriptionInput.addEventListener(
  "input",
  updateDescriptionCounter
);


/* =======================================================
   SAVE DESCRIPTION
   ======================================================= */

saveProfileDescriptionButton.addEventListener(
  "click",
  function() {

    const description =
      profileDescriptionInput.value
        .trim();


    userRefFor(
      window.userId
    )
      .update({

        description:
          description

      })
      .then(
        function() {

          profileDescriptionInput.value =
            description;

          updateDescriptionCounter();


          saveProfileDescriptionButton.textContent =
            "Saved";


          setTimeout(
            function() {

              saveProfileDescriptionButton.textContent =
                "Save Description";

            },
            1200
          );

        }
      )
      .catch(
        function(error) {

          console.error(
            "Could not save description:",
            error
          );

          alert(
            "Could not save description: " +
            error.message
          );

        }
      );

  }
);