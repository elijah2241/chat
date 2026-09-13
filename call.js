console.log("call.js loaded");


/* =========================================================
   CALLING SYSTEM
   ========================================================= */

function initCalling() {

  console.log("Initializing calling system...");


  /* =======================================================
     GET HTML ELEMENTS
     ======================================================= */

  const callButton =
    document.getElementById("callbutton");

  const createCallContainer =
    document.getElementById("createcallcontainer");

  const createCallButton =
    document.getElementById("createCallButton");

  const callNameInput =
    document.getElementById("callNameInput");

  const activeCallsList =
    document.getElementById("activeCallsList");

  const closeCreateCallButton =
    document.getElementById("closeCreateCallButton");


  /* =======================================================
     CHECK REQUIREMENTS
     ======================================================= */

  if (!callButton) {
    console.error("Missing #callbutton");
    return;
  }

  if (!createCallContainer) {
    console.error("Missing #createcallcontainer");
    return;
  }

  if (!createCallButton) {
    console.error("Missing #createCallButton");
    return;
  }

  if (!callNameInput) {
    console.error("Missing #callNameInput");
    return;
  }

  if (!activeCallsList) {
    console.error("Missing #activeCallsList");
    return;
  }

  if (!closeCreateCallButton) {
    console.error("Missing #closeCreateCallButton");
    return;
  }

  if (typeof db === "undefined") {
    console.error(
      "Firebase database 'db' is not available."
    );
    return;
  }


  console.log(
    "Calling system successfully initialized."
  );


  /* =======================================================
     FIREBASE REFERENCE
     ======================================================= */

  const activeCallsRef =
    db.ref("activeCalls");


  /* =======================================================
     DELETE EMPTY CALL
     ======================================================= */

  function deleteCallIfEmpty(callId) {

    const callRef =
      activeCallsRef.child(callId);


    callRef.once(
      "value",
      function(snapshot) {

        const call =
          snapshot.val();


        if (!call) {
          return;
        }


        const users =
          call.users || {};


        const userCount =
          Object.keys(users).length;


        if (userCount === 0) {

          console.log(
            "Deleting empty call:",
            callId
          );

          callRef.remove();

        }

      }
    );

  }


  /* =======================================================
     OPEN LOCAL WEBRTC CALL PAGE
     ======================================================= */

  function openCallingPage(
    callId,
    callName
  ) {

    const userId =
      window.userId || "";


    const userName =
      typeof savedName !== "undefined" &&
      savedName
        ? savedName
        : "Anonymous";


    if (!userId) {

      alert(
        "Your user ID has not loaded yet."
      );

      return;

    }


    /*
       IMPORTANT:

       This opens call.html on the SAME
       server/host as the current page.

       Example:

       http://localhost:3000/index.html

       becomes:

       http://localhost:3000/call.html
    */

    const callingURL =
      "call.html" +
      "?callId=" +
      encodeURIComponent(callId) +
      "&userId=" +
      encodeURIComponent(userId) +
      "&userName=" +
      encodeURIComponent(userName) +
      "&callName=" +
      encodeURIComponent(
        callName || "Call"
      );


    console.log(
      "Opening calling page:",
      callingURL
    );


    /*
       Open call.html in a new tab/window.
    */

    const callWindow =
      window.open(
        callingURL,
        "_blank"
      );


    /*
       Detect popup blocking.
    */

    if (!callWindow) {

      alert(
        "The call window was blocked by your browser. Please allow pop-ups for this site."
      );

      return;

    }

  }


  /* =======================================================
     OPEN CREATE CALL WINDOW
     ======================================================= */

  callButton.addEventListener(
    "click",
    function() {

      console.log(
        "Opening create call window."
      );


      createCallContainer.style.display =
        "block";

    }
  );


  /* =======================================================
     CLOSE CREATE CALL WINDOW
     ======================================================= */

  closeCreateCallButton.addEventListener(
    "click",
    function() {

      createCallContainer.style.display =
        "none";

    }
  );


  /* =======================================================
     CREATE CALL
     ======================================================= */

  createCallButton.addEventListener(
    "click",
    async function() {

      const callName =
        callNameInput.value.trim();


      /* -----------------------------------------------------
         CHECK CALL NAME
         ----------------------------------------------------- */

      if (!callName) {

        alert(
          "Enter a name for the call first."
        );

        return;

      }


      /* -----------------------------------------------------
         CHECK USER ID
         ----------------------------------------------------- */

      if (!window.userId) {

        alert(
          "Your user ID has not loaded yet."
        );

        return;

      }


      /* -----------------------------------------------------
         GET USER NAME
         ----------------------------------------------------- */

      const userName =
        typeof savedName !== "undefined" &&
        savedName
          ? savedName
          : "Anonymous";


      /* -----------------------------------------------------
         CREATE FIREBASE CALL
         ----------------------------------------------------- */

      const newCallRef =
        activeCallsRef.push();


      const callData = {

        name:
          callName,

        creatorId:
          window.userId,

        creatorName:
          userName,

        active:
          true,

        createdAt:
          Date.now(),

        users: {

          [window.userId]: {

            id:
              window.userId,

            name:
              userName

          }

        }

      };


      try {

        /* ---------------------------------------------------
           CREATE DISCONNECT CLEANUP
           --------------------------------------------------- */

        const creatorUserRef =
          newCallRef
            .child("users")
            .child(window.userId);


        await creatorUserRef
          .onDisconnect()
          .remove();


        /* ---------------------------------------------------
           SAVE CALL
           --------------------------------------------------- */

        await newCallRef.set(
          callData
        );


        console.log(
          "Call created:",
          newCallRef.key
        );


        /* ---------------------------------------------------
           CLEAR INPUT
           --------------------------------------------------- */

        callNameInput.value =
          "";


        /* ---------------------------------------------------
           CLOSE WINDOW
           --------------------------------------------------- */

        createCallContainer.style.display =
          "none";


        /* ---------------------------------------------------
           OPEN CALLING PAGE
           --------------------------------------------------- */

        openCallingPage(
          newCallRef.key,
          callName
        );

      }

      catch (error) {

        console.error(
          "Firebase error:",
          error
        );


        alert(
          "Firebase error: " +
          error.message
        );

      }

    }
  );


  /* =======================================================
     DISPLAY ACTIVE CALLS
     ======================================================= */

  activeCallsRef.on(
    "value",
    function(snapshot) {

      activeCallsList.innerHTML =
        "";


      snapshot.forEach(
        function(callSnapshot) {

          const callId =
            callSnapshot.key;


          const call =
            callSnapshot.val();


          if (!call) {
            return;
          }


          /* -------------------------------------------------
             GET USERS
             ------------------------------------------------- */

          const users =
            call.users || {};


          const userCount =
            Object.keys(users).length;


          /* -------------------------------------------------
             DELETE EMPTY CALL
             ------------------------------------------------- */

          if (userCount === 0) {

            deleteCallIfEmpty(
              callId
            );

            return;

          }


          /* -------------------------------------------------
             CHECK ACTIVE STATUS
             ------------------------------------------------- */

          if (
            call.active !== true
          ) {

            return;

          }


          /* =================================================
             CREATE CALL ELEMENT
             ================================================= */

          const callElement =
            document.createElement(
              "div"
            );


          callElement.className =
            "activeCall";


          /* =================================================
             CALL NAME
             ================================================= */

          const callNameElement =
            document.createElement(
              "span"
            );


          callNameElement.className =
            "activeCallName";


          callNameElement.textContent =
            call.name ||
            "Unnamed Call";


          /* =================================================
             BUTTON CONTAINER
             ================================================= */

          const buttonsContainer =
            document.createElement(
              "div"
            );


          buttonsContainer.className =
            "activeCallButtons";


          /* =================================================
             JOIN BUTTON
             ================================================= */

          const joinButton =
            document.createElement(
              "button"
            );


          joinButton.className =
            "joinCallButton";


          joinButton.textContent =
            "Join";


          joinButton.addEventListener(
            "click",
            async function() {

              console.log(
                "Joining call:",
                callId
              );


              if (!window.userId) {

                alert(
                  "Your user ID has not loaded yet."
                );

                return;

              }


              try {

                /* -------------------------------------------
                   USER REFERENCE
                   ------------------------------------------- */

                const userRef =
                  activeCallsRef
                    .child(callId)
                    .child("users")
                    .child(window.userId);


                /* -------------------------------------------
                   DISCONNECT CLEANUP
                   ------------------------------------------- */

                await userRef
                  .onDisconnect()
                  .remove();


                /* -------------------------------------------
                   ADD USER TO CALL
                   ------------------------------------------- */

                await userRef.set({

                  id:
                    window.userId,

                  name:
                    typeof savedName !== "undefined" &&
                    savedName
                      ? savedName
                      : "Anonymous"

                });


                console.log(
                  "Successfully joined call:",
                  callId
                );


                /* -------------------------------------------
                   CLOSE CALL LIST
                   ------------------------------------------- */

                createCallContainer.style.display =
                  "none";


                /* -------------------------------------------
                   OPEN WEBRTC PAGE
                   ------------------------------------------- */

                openCallingPage(
                  callId,
                  call.name ||
                  "Call"
                );

              }

              catch (error) {

                console.error(
                  "Join error:",
                  error
                );


                alert(
                  "Could not join call: " +
                  error.message
                );

              }

            }
          );


          /* =================================================
             DELETE CALL BUTTON
             ================================================= */

          const deleteCallButton =
            document.createElement(
              "button"
            );


          deleteCallButton.className =
            "deleteCallButton";


          deleteCallButton.textContent =
            "Delete Call";


          deleteCallButton.addEventListener(
            "click",
            async function() {

              const password =
                prompt(
                  "Enter password"
                );


              if (
                password === null
              ) {

                return;

              }


              if (
                password !== "022912"
              ) {

                alert(
                  "Incorrect password."
                );

                return;

              }


              const confirmed =
                confirm(
                  "Are you sure you want to delete this call?"
                );


              if (!confirmed) {

                return;

              }


              try {

                await activeCallsRef
                  .child(callId)
                  .remove();


                console.log(
                  "Call deleted:",
                  callId
                );

              }

              catch (error) {

                console.error(
                  "Delete call error:",
                  error
                );


                alert(
                  "Could not delete call: " +
                  error.message
                );

              }

            }
          );


          /* =================================================
             ADD BUTTONS
             ================================================= */

          buttonsContainer.appendChild(
            joinButton
          );


          buttonsContainer.appendChild(
            deleteCallButton
          );


          /* =================================================
             ADD CALL TO LIST
             ================================================= */

          callElement.appendChild(
            callNameElement
          );


          callElement.appendChild(
            buttonsContainer
          );


          activeCallsList.appendChild(
            callElement
          );

        }
      );

    }
  );


  /* =======================================================
     CLEAN UP EMPTY CALLS WHEN A CALL CHANGES
     ======================================================= */

  activeCallsRef.on(
    "child_changed",
    function(snapshot) {

      const call =
        snapshot.val();


      if (!call) {
        return;
      }


      const users =
        call.users || {};


      const userCount =
        Object.keys(users).length;


      if (userCount === 0) {

        activeCallsRef
          .child(snapshot.key)
          .remove();

      }

    }
  );

}


/* =========================================================
   START AFTER DOM LOAD
   ========================================================= */

if (
  document.readyState ===
  "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    initCalling
  );

}

else {

  initCalling();

}