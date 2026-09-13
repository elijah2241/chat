
/* =========================
   ELEMENTS
   ========================= */

const settingsContainer =
  document.getElementById("settingscontainer");

const settingsButton =
  document.getElementById("settings-button");

const closeSettingsButton =
  document.getElementById("closesettings");

const outlineColor =
  document.getElementById("outlinecolor");

const textColor =
  document.getElementById("textcolor");

const backgroundColor =
  document.getElementById("backgroundcolor");


/* =========================
   SETTINGS TABS
   ========================= */

const generalSettingsTab =
  document.getElementById("generalSettingsTab");

const profileSettingsTab =
  document.getElementById("profileSettingsTab");

const generalSettingsPanel =
  document.getElementById("generalSettingsPanel");

const profileSettingsPanel =
  document.getElementById("profileSettingsPanel");


/* =========================
   PROFILE PICTURE
   ========================= */

const profilePictureInput =
  document.getElementById("profilePictureInput");

const profilePictureButton =
  document.getElementById("profilePictureButton");

const removeProfilePictureButton =
  document.getElementById(
    "removeProfilePictureButton"
  );

const profilePicturePreview =
  document.getElementById(
    "profilePicturePreview"
  );


/* =========================
   SIDEBAR
   ========================= */

const sidebarToggle =
  document.getElementById("sidebarToggle");

const sidebarOverlay =
  document.getElementById("sidebarOverlay");

const sidebar =
  document.getElementById("sidebar");


/* =========================
   PRIVATE MESSAGES
   ========================= */

const privateButton =
  document.getElementById("private-button");

const sidebarPrivateButton =
  document.getElementById(
    "sidebarPrivateButton"
  );


/* =========================
   MESSAGE REQUESTS
   ========================= */

const requestContainer =
  document.getElementById(
    "requestContainer"
  );

const closeRequests =
  document.getElementById(
    "closeRequests"
  );

const messageRequestsButton =
  document.getElementById(
    "messageRequestsButton"
  );


/* =========================
   PRIVATE WINDOW
   ========================= */

const privateContainer =
  document.getElementById(
    "privateContainer"
  );

const closePrivate =
  document.getElementById(
    "closePrivate"
  );


/* =========================
   SETTINGS
   ========================= */

settingsButton.addEventListener(
  "click",
  function () {

    settingsContainer.style.display =
      "block";

  }
);


closeSettingsButton.addEventListener(
  "click",
  function () {

    settingsContainer.style.display =
      "none";

  }
);


/* =========================
   GENERAL / PROFILE TABS
   ========================= */

generalSettingsTab.addEventListener(
  "click",
  function () {

    generalSettingsPanel.style.display =
      "block";

    profileSettingsPanel.style.display =
      "none";

    generalSettingsTab.classList.add(
      "active"
    );

    profileSettingsTab.classList.remove(
      "active"
    );

  }
);


profileSettingsTab.addEventListener(
  "click",
  function () {

    generalSettingsPanel.style.display =
      "none";

    profileSettingsPanel.style.display =
      "block";

    generalSettingsTab.classList.remove(
      "active"
    );

    profileSettingsTab.classList.add(
      "active"
    );

  }
);


/* =========================
   COLORS
   ========================= */

outlineColor.addEventListener(
  "change",
  function () {

    document.documentElement.style.setProperty(
      "--outline-color",
      outlineColor.value
    );

  }
);


textColor.addEventListener(
  "change",
  function () {

    document.documentElement.style.setProperty(
      "--text-color",
      textColor.value
    );

  }
);


backgroundColor.addEventListener(
  "change",
  function () {

    document.documentElement.style.setProperty(
      "--background-color",
      backgroundColor.value
    );

  }
);


/* =========================
   PROFILE PICTURE
   ========================= */

/*
   OPEN FILE PICKER
*/

profilePictureButton.addEventListener(
  "click",
  function (event) {

    event.preventDefault();

    profilePictureInput.click();

  }
);


/*
   IMAGE SELECTED
*/

profilePictureInput.addEventListener(
  "change",
  function () {

    const file =
      profilePictureInput.files[0];

    if (!file) {
      return;
    }


    if (!file.type.startsWith("image/")) {

      alert(
        "Please choose an image file."
      );

      profilePictureInput.value = "";

      return;

    }


    const reader =
      new FileReader();


    reader.onload =
      function (event) {

        const imageData =
          event.target.result;


        /*
           SHOW IMAGE
        */

        showProfilePicture(
          imageData
        );


        /*
           SAVE LOCALLY
        */

        try {

          localStorage.setItem(
            "profilePicture",
            imageData
          );

        } catch (error) {

          console.warn(
            "Could not save profile picture locally:",
            error
          );

        }


        /*
           SAVE TO FIREBASE
        */

        userRefFor(window.userId)
          .update({
            profilePicture:
              imageData
          })
          .then(
            function () {

              console.log(
                "Profile picture saved."
              );

            }
          )
          .catch(
            function (error) {

              console.error(
                "Firebase profile picture error:",
                error
              );

              alert(
                "Could not save the profile picture to Firebase."
              );

            }
          );

      };


    reader.readAsDataURL(file);

  }
);


/*
   SHOW PROFILE PICTURE
*/

function showProfilePicture(
  imageData
) {

  profilePicturePreview.innerHTML =
    "";

  const image =
    document.createElement("img");

  image.src =
    imageData;

  image.alt =
    "Profile Picture";

  profilePicturePreview.appendChild(
    image
  );

}


/*
   LOAD PROFILE PICTURE
*/

function loadProfilePicture() {

  /*
     FIRST CHECK LOCAL STORAGE
  */

  let localPicture =
    null;


  try {

    localPicture =
      localStorage.getItem(
        "profilePicture"
      );

  } catch (error) {

    console.warn(
      "Could not read local profile picture:",
      error
    );

  }


  if (localPicture) {

    showProfilePicture(
      localPicture
    );

  }


  /*
     THEN CHECK FIREBASE
  */

  userRefFor(
    window.userId +
    "/profilePicture"
  )
    .once("value")
    .then(
      function (snapshot) {

        const firebasePicture =
          snapshot.val();


        if (!firebasePicture) {
          return;
        }


        showProfilePicture(
          firebasePicture
        );


        try {

          localStorage.setItem(
            "profilePicture",
            firebasePicture
          );

        } catch (error) {

          console.warn(
            "Could not cache profile picture:",
            error
          );

        }

      }
    )
    .catch(
      function (error) {

        console.error(
          "Could not load profile picture:",
          error
        );

      }
    );

}


/*
   REMOVE PROFILE PICTURE
*/

removeProfilePictureButton.addEventListener(
  "click",
  function () {

    userRefFor(window.userId)
      .child("profilePicture")
      .remove()
      .then(
        function () {

          try {

            localStorage.removeItem(
              "profilePicture"
            );

          } catch (error) {

            console.warn(
              "Could not remove local picture:",
              error
            );

          }


          profilePicturePreview.innerHTML =
            "No Profile Picture";

          profilePictureInput.value =
            "";

        }
      )
      .catch(
        function (error) {

          console.error(
            "Could not remove profile picture:",
            error
          );

          alert(
            "Could not remove profile picture."
          );

        }
      );

  }
);


/*
   LOAD PROFILE PICTURE
*/

loadProfilePicture();


/* =========================
   SIDEBAR
   ========================= */

function closeSidebar() {

  sidebar.classList.remove(
    "open"
  );

  sidebarOverlay.classList.remove(
    "show"
  );

}


sidebarToggle.addEventListener(
  "click",
  function () {

    sidebar.classList.toggle(
      "open"
    );

    sidebarOverlay.classList.toggle(
      "show"
    );

  }
);


sidebarOverlay.addEventListener(
  "click",
  closeSidebar
);


/* =========================
   REQUEST WINDOW
   ========================= */

messageRequestsButton.addEventListener(
  "click",
  function () {

    requestContainer.style.display =
      "block";

    privateContainer.style.display =
      "none";

    closeSidebar();

  }
);


closeRequests.addEventListener(
  "click",
  function () {

    requestContainer.style.display =
      "none";

  }
);


/* =========================
   PRIVATE WINDOW
   ========================= */

privateButton.addEventListener(
  "click",
  function () {

    privateContainer.style.display =
      "block";

    requestContainer.style.display =
      "none";

  }
);


sidebarPrivateButton.addEventListener(
  "click",
  function () {

    privateContainer.style.display =
      "block";

    requestContainer.style.display =
      "none";

    closeSidebar();

  }
);


closePrivate.addEventListener(
  "click",
  function () {

    privateContainer.style.display =
      "none";

  }
);
