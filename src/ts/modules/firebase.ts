import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { getStorage, ref,  uploadBytesResumable,getDownloadURL } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAVwhQr2zeNEAr1FSrD6ygo5dJeLkxjtRk",
  authDomain: "clubtravel-6eff6.firebaseapp.com",
  projectId: "clubtravel-6eff6",
  storageBucket: "clubtravel-6eff6.appspot.com",
  messagingSenderId: "883499742498",
  appId: "1:883499742498:web:b0bf6b06d8073d249a217b",
};

export const app = initializeApp(firebaseConfig);




export class GetSing{
  promise(){
    return new Promise(resolve => {
      onAuthStateChanged(getAuth(), (user) => {
        if(user){
          resolve(user)
        }else{
          resolve(false)
        }
      })
    })
  }
}

// const user = await new GetSing().promise() 








// const storage = getStorage(app);

// const photo = document.querySelector("#photo") as HTMLInputElement;
// const form = document.querySelector("#form") as HTMLFormElement;

// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const files = photo.files;
//   if (files && files.length > 0) {
//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];
//       const storageRef = ref(
//         storage,
//         `Грузия/Батумі/Black Sea Star/${file.name}`
//       );
//       const uploadTask = uploadBytesResumable(storageRef, file);

//       uploadTask
//         .then((snapshot) => {
//           console.log("Upload successful for", file.name);

//           getDownloadURL(snapshot.ref).then((downloadURL: string) => {
//             console.table(downloadURL);
//           });
//         })
//         .catch((error) => {
//           console.error("Upload failed for", file.name, error);
//         });
//     }
//   }
// });

// const hotelsCollection = collection(getFirestore(app), "hotels");

// hotels.forEach(function (hotel){
// addDoc(hotelsCollection,hotel).then(
//   function(){
//     console.log("Document successfully written!");
//   }
// )
// .catch(function(error){
//   console.error("Error writing document: ", error);
// })
// })
