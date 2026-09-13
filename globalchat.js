/* =======================================================
   GLOBAL CHAT ELEMENTS
   ======================================================= */

const messages =
  document.getElementById("messages");

const sendMessage =
  document.getElementById("sendMessage");


/* =======================================================
   PROFILE PICTURE CACHE
   ======================================================= */

const profilePictureCache = {};

const profilePictureListeners = {};


/* =======================================================
   GET PROFILE PICTURE
   ======================================================= */

function getProfilePicture(userId) {

  if (!userId) {
    return Promise.resolve(null);
  }


  /*
     Create only one realtime listener
     for each user's profile picture.
  */

  if (!profilePictureListeners[userId]) {

    profilePictureListeners[userId] =
      userRefFor(
        userId + "/profilePicture"
      ).on(
        "value",
        function(snapshot) {

          const picture =
            snapshot.val() || null;


          profilePictureCache[userId] =
            picture;


          /*
             Update every displayed profile
             picture belonging to this user.
          */

          const elements =
            document.querySelectorAll(
              '[data-profile-picture-user="' +
              CSS.escape(userId) +
              '"]'
            );


          elements.forEach(
            function(container) {

              container.innerHTML =
                "";


              if (picture) {

                const img =
                  document.createElement(
                    "img"
                  );


                img.src =
                  picture;


                img.alt =
                  "Profile picture";


                container.appendChild(
                  img
                );

              } else {

                container.textContent =
                  "👤";

              }

            }
          );

        },
        function(error) {

          console.error(
            "Could not listen to profile picture:",
            error
          );

        }
      );

  }


  return Promise.resolve(
    profilePictureCache[userId] || null
  );

}


/* =======================================================
   FORMAT MESSAGE TIME
   ======================================================= */

function formatMessageTime(timestamp) {

  if (!timestamp) {
    return "";
  }


  const date =
    new Date(timestamp);


  if (isNaN(date.getTime())) {
    return "";
  }


  return date.toLocaleString(
    undefined,
    {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit"
    }
  );

}


/* =======================================================
   OPEN USER PROFILE
   ======================================================= */

function openUserProfile(userId) {

  if (!userId) {
    return;
  }


  /*
     Don't open your own profile.
  */

  if (
    userId ===
    window.userId
  ) {

    return;

  }


  const profileContainer =
    document.getElementById(
      "userProfileContainer"
    );

  const profilePicture =
    document.getElementById(
      "userProfilePicture"
    );

  const profileName =
    document.getElementById(
      "userProfileName"
    );

  const profileDescription =
    document.getElementById(
      "userProfileDescription"
    );

  const requestButton =
    document.getElementById(
      "sendProfileRequestButton"
    );


  if (
    !profileContainer ||
    !profilePicture ||
    !profileName ||
    !profileDescription ||
    !requestButton
  ) {

    console.error(
      "User profile elements are missing."
    );

    return;

  }


  /*
     Loading state.
  */

  profileName.textContent =
    "Loading...";

  profileDescription.textContent =
    "";

  profilePicture.innerHTML =
    "👤";

  requestButton.disabled =
    true;


  profileContainer.style.display =
    "flex";


  /*
     Store the selected user ID
     on the request button.
  */

  requestButton.dataset.userId =
    userId;


  /*
     Load profile picture.
  */

  getProfilePicture(
    userId
  );


  /*
     Listen to the complete profile
     so changes update live.
  */

  userRefFor(
    userId
  ).on(
    "value",
    function(snapshot) {

      /*
         Make sure this profile is
         still the selected profile.
      */

      if (
        requestButton.dataset.userId !==
        userId
      ) {

        return;

      }


      const data =
        snapshot.val();


      if (!data) {

        profileName.textContent =
          "Unknown User";

        profileDescription.textContent =
          "This user's profile could not be found.";

        profilePicture.innerHTML =
          "👤";

        requestButton.textContent =
          "User Not Found";

        requestButton.disabled =
          true;

        return;

      }


      /*
         NAME
      */

      profileName.textContent =
        data.name ||
        "Unknown User";


      /*
         DESCRIPTION
      */

      profileDescription.textContent =
        data.description ||
        "No description.";


      /*
         PROFILE PICTURE
      */

      profilePicture.innerHTML =
        "";


      if (
        data.profilePicture
      ) {

        const img =
          document.createElement(
            "img"
          );


        img.src =
          data.profilePicture;


        img.alt =
          data.name ||
          "Profile picture";


        profilePicture.appendChild(
          img
        );

      } else {

        profilePicture.textContent =
          "👤";

      }


      /*
         Update cache.
      */

      profilePictureCache[userId] =
        data.profilePicture ||
        null;


      /*
         Check whether this user
         is already connected.
      */

      acceptedRefFor(
        window.userId
      )
        .child(userId)
        .once("value")
        .then(
          function(acceptedSnapshot) {

            /*
               Make sure the popup is
               still showing this user.
            */

            if (
              requestButton.dataset.userId !==
              userId
            ) {

              return;

            }


            if (
              acceptedSnapshot.exists()
            ) {

              requestButton.textContent =
                "Already Connected";

              requestButton.disabled =
                true;

            } else {

              requestButton.textContent =
                "Send Private Message Request";

              requestButton.disabled =
                false;

            }

          }
        )
        .catch(
          function(error) {

            console.error(
              "Could not check connection:",
              error
            );

          }
        );

    },
    function(error) {

      console.error(
        "Could not listen to user profile:",
        error
      );


      profileName.textContent =
        "Error";

      profileDescription.textContent =
        "Could not load this profile.";

    }
  );

}


/* =======================================================
   CLOSE USER PROFILE
   ======================================================= */

const closeUserProfileButton =
  document.getElementById(
    "closeUserProfileButton"
  );


if (closeUserProfileButton) {

  closeUserProfileButton.addEventListener(
    "click",
    function() {

      const container =
        document.getElementById(
          "userProfileContainer"
        );


      if (container) {

        container.style.display =
          "none";

      }

    }
  );

}


/* =======================================================
   CLOSE PROFILE BY CLICKING BACKGROUND
   ======================================================= */

const userProfileContainer =
  document.getElementById(
    "userProfileContainer"
  );


if (userProfileContainer) {

  userProfileContainer.addEventListener(
    "click",
    function(event) {

      if (
        event.target ===
        this
      ) {

        this.style.display =
          "none";

      }

    }
  );

}


/* =======================================================
   SEND PRIVATE MESSAGE REQUEST
   ======================================================= */

const sendProfileRequestButton =
  document.getElementById(
    "sendProfileRequestButton"
  );


if (sendProfileRequestButton) {

  sendProfileRequestButton.addEventListener(
    "click",
    function() {

      const userId =
        this.dataset.userId;


      if (!userId) {

        console.error(
          "No user ID was stored on the profile request button."
        );

        return;

      }


      if (
        userId ===
        window.userId
      ) {

        return;

      }


      /*
         The private-message script explicitly
         exposes this function on window.
      */

      if (
        typeof window.sendMessageRequest !==
        "function"
      ) {

        console.error(
          "window.sendMessageRequest() is not available."
        );


        alert(
          "Private messaging is not ready yet."
        );


        return;

      }


      /*
         Send the request.
      */

      window.sendMessageRequest(
        userId
      );


      /*
         Prevent repeated clicks.
      */

      this.textContent =
        "Request Sent";

      this.disabled =
        true;

    }
  );

}


/* =======================================================
   CREATE GLOBAL MESSAGE PROFILE PICTURE
   ======================================================= */

function createProfilePictureElement(
  userId,
  name
) {

  const container =
    document.createElement(
      "div"
    );


  container.className =
    "messageProfilePicture";


  /*
     Store user ID so the realtime
     profile picture listener can
     find this element.
  */

  if (userId) {

    container.dataset.profilePictureUser =
      userId;

  }


  /*
     Open the profile when another
     user's picture is clicked.
  */

  if (
    userId &&
    userId !== window.userId
  ) {

    container.addEventListener(
      "click",
      function(event) {

        event.stopPropagation();


        openUserProfile(
          userId
        );

      }
    );

  }


  /*
     Load the profile picture.
  */

  getProfilePicture(
    userId
  )
    .then(
      function(profilePicture) {

        container.innerHTML =
          "";


        if (profilePicture) {

          const img =
            document.createElement(
              "img"
            );


          img.src =
            profilePicture;


          img.alt =
            name ||
            "Profile picture";


          container.appendChild(
            img
          );

        } else {

          container.textContent =
            "👤";

        }

      }
    )
    .catch(
      function(error) {

        console.error(
          "Could not create profile picture:",
          error
        );


        container.textContent =
          "👤";

      }
    );


  return container;

}


/* =======================================================
   DISPLAY GLOBAL MESSAGE
   ======================================================= */

function displayMessage(snapshot) {

  const data =
    snapshot.val();


  if (!data) {
    return;
  }


  const messageDiv =
    document.createElement(
      "div"
    );


  messageDiv.className =
    "message";


  /*
     Store sender ID.
  */

  if (data.senderId) {

    messageDiv.dataset.senderId =
      data.senderId;

  }


  /* =====================================================
     PROFILE PICTURE
     ===================================================== */

  const profilePicture =
    createProfilePictureElement(
      data.senderId,
      data.name ||
      "Unknown"
    );


  messageDiv.appendChild(
    profilePicture
  );


  /* =====================================================
     MESSAGE TEXT
     ===================================================== */

  const messageText =
    document.createElement(
      "div"
    );


  messageText.className =
    "messageText";


  const nameElement =
    document.createElement(
      "strong"
    );


  nameElement.className =
    "messageSenderName";


  nameElement.textContent =
    (data.name ||
      "Unknown") +
    ": ";


  const textElement =
    document.createElement(
      "span"
    );


  textElement.textContent =
    data.message ||
    "";


  messageText.appendChild(
    nameElement
  );

  messageText.appendChild(
    textElement
  );


  messageDiv.appendChild(
    messageText
  );


  /* =====================================================
     LIVE PROFILE NAME
     ===================================================== */

  if (data.senderId) {

    userRefFor(
      data.senderId
    ).on(
      "value",
      function(profileSnapshot) {

        const profileData =
          profileSnapshot.val() ||
          {};


        nameElement.textContent =
          (
            profileData.name ||
            data.name ||
            "Unknown"
          ) +
          ": ";

      },
      function(error) {

        console.error(
          "Could not listen to message sender profile:",
          error
        );

      }
    );

  }


  /* =====================================================
     MESSAGE TIME
     ===================================================== */

  const messageTime =
    document.createElement(
      "span"
    );


  messageTime.className =
    "messageTime";


  messageTime.textContent =
    formatMessageTime(
      data.time
    );


  messageDiv.appendChild(
    messageTime
  );


  /* =====================================================
     ADD MESSAGE
     ===================================================== */

  messages.appendChild(
    messageDiv
  );


  messages.scrollTop =
    messages.scrollHeight;

}


/* =======================================================
   LOAD GLOBAL MESSAGES
   ======================================================= */

if (messages) {

  messagesRef.on(
    "child_added",
    function(snapshot) {

      displayMessage(
        snapshot
      );

    },
    function(error) {

      console.error(
        "Could not load global messages:",
        error
      );

    }
  );

}


/* =======================================================
   SEND GLOBAL MESSAGE BUTTON
   ======================================================= */

if (sendMessage) {

  sendMessage.addEventListener(
    "click",
    sendPublicMessage
  );

}


/* =======================================================
   GLOBAL MESSAGE ENTER KEY
   ======================================================= */

const globalMessageInput =
  document.getElementById(
    "message"
  );


if (globalMessageInput) {

  globalMessageInput.addEventListener(
    "keydown",
    function(event) {

      if (
        event.key ===
        "Enter"
      ) {

        event.preventDefault();


        sendPublicMessage();

      }

    }
  );

}


/* =======================================================
   SEND GLOBAL MESSAGE
   ======================================================= */

function sendPublicMessage() {

  const messageInput =
    document.getElementById(
      "message"
    );


  if (!messageInput) {

    console.error(
      'Global message input with id="message" was not found.'
    );

    return;

  }


  const text =
    messageInput.value.trim();


  if (!text) {
    return;
  }


  /*
     Use the current profile name.
  */

  const currentName =
    savedName ||
    nameInput.value ||
    "Unknown";


  /*
     Make sure the user ID exists.
  */

  if (!window.userId) {

    console.error(
      "No user ID is available."
    );

    return;

  }


  /*
     Send message.
  */

  messagesRef
    .push({

      senderId:
        window.userId,

      name:
        currentName,

      message:
        text,

      time:
        firebase.database.ServerValue.TIMESTAMP

    })
    .then(
      function() {

        messageInput.value =
          "";

      }
    )
    .catch(
      function(error) {

        console.error(
          "Could not send global message:",
          error
        );


        alert(
          "Message could not be sent: " +
          error.message
        );

      }
    );

}


/* =======================================================
   SAFETY CHECKS
   ======================================================= */

if (!messages) {

  console.error(
    'The element with id="messages" was not found.'
  );

}


if (!sendMessage) {

  console.error(
    'The element with id="sendMessage" was not found.'
  );

}


/* =======================================================
   DEBUG
   ======================================================= */

console.log(
  "globalchat.js loaded successfully."
);

console.log(
  "sendMessageRequest available:",
  typeof window.sendMessageRequest
);