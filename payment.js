/* =========================================================
   LUVORA DRAFT FILE STORAGE
   Reads customer photos and video saved on Birthday page.
   ========================================================= */

const LUVORA_DRAFT_DB = "luvoraDraftDB";
const LUVORA_DRAFT_STORE = "draftFiles";

function openDraftDatabase() {

  return new Promise((resolve, reject) => {

    const request =
      indexedDB.open(LUVORA_DRAFT_DB, 1);

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };

  });

}


function getDraftFile(key) {

  return openDraftDatabase()
    .then((db) => {

      return new Promise((resolve, reject) => {

        const transaction =
          db.transaction(
            LUVORA_DRAFT_STORE,
            "readonly"
          );

        const store =
          transaction.objectStore(
            LUVORA_DRAFT_STORE
          );

        const request =
          store.get(key);

        request.onsuccess = () => {

          db.close();

          resolve(
            request.result || null
          );

        };

        request.onerror = () => {

          db.close();

          reject(
            request.error
          );

        };

      });

    });

}

document.addEventListener("DOMContentLoaded", () => {

  const payNowButton =
    document.getElementById("payNowButton");

  const backButton =
    document.getElementById("backButton");


  /* =====================================================
     LOAD CUSTOMER DATA
     ===================================================== */

  let surpriseData = null;

  const savedData =
    sessionStorage.getItem("luvoraSurpriseData");

  if (savedData) {

    try {

      surpriseData =
        JSON.parse(savedData);

    } catch (error) {

      console.error(
        "Could not read surprise data:",
        error
      );

    }

  }

const customerNameDisplay =
  document.getElementById("customerNameDisplay");

const customerDateDisplay =
  document.getElementById("customerDateDisplay");

if (surpriseData) {

  if (
    customerNameDisplay &&
    surpriseData.name
  ) {
    customerNameDisplay.textContent =
      surpriseData.name;
  }

  if (
    customerDateDisplay &&
    surpriseData.date
  ) {
    customerDateDisplay.textContent =
      surpriseData.date;
  }

}

/* =====================================================
   LOAD SAVED CUSTOMER MEDIA
   ===================================================== */

async function checkSavedMedia() {

  try {

    let photoCount = 0;


    /* Check up to 6 saved photos */

    for (let i = 0; i < 6; i++) {

      const photo =
        await getDraftFile(
          `photo-${i}`
        );

      if (photo) {
        photoCount++;
      }

    }


    /* Check saved video */

    const savedVideo =
      await getDraftFile("video");


    console.log(
      "Luvora draft media:",
      {
        photos: photoCount,
        video: savedVideo
          ? savedVideo.name
          : "No video"
      }
    );


  } catch (error) {

    console.error(
      "Could not load draft media:",
      error
    );

  }

}


checkSavedMedia();


  /* =====================================================
     PAYMENT BUTTON
     ===================================================== */

  if (payNowButton) {

    payNowButton.addEventListener("click", () => {

      payNowButton.disabled = true;

      payNowButton.innerHTML =
        `Preparing Payment <span>...</span>`;

      /*
       * Real payment gateway will be connected here later.
       */

      setTimeout(() => {

        payNowButton.disabled = false;

        payNowButton.innerHTML =
          `Continue to Payment <span>→</span>`;

      }, 1200);

    });

  }


  /* =====================================================
     BACK BUTTON
     ===================================================== */

  if (backButton) {

    backButton.addEventListener("click", () => {

      window.history.back();

    });

  }

});