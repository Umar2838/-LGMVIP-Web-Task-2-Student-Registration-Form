
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import { getFirestore, addDoc, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAY_DpQgpQobx3BL6QG4X0YfHomKdo6XfU",
  authDomain: "student-card-8bf9e.firebaseapp.com",
  projectId: "student-card-8bf9e",
  storageBucket: "student-card-8bf9e.appspot.com",
  messagingSenderId: "406140825892",
  appId: "1:406140825892:web:6170056d23600feae203b1",
  measurementId: "G-JYB2BYNDBQ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);








const fullname = document.getElementById("name")
const fname = document.getElementById("fname")
const cnic = document.getElementById("cnic")
const course = document.getElementById("course")



let btn = document.getElementById("btn")



var loader = document.getElementById("spinner")
let content = document.getElementById("content")
btn && btn.addEventListener("click", async (e) => {
  e.preventDefault();

  try {



    loader.style.display = "block";
    content.style.display = "none"
    const docRef = await addDoc(collection(db, "users"), {

      name: fullname.value,
      fname: fname.value,
      cnic: cnic.value,
      course: course.value,
     

    });

    Swal.fire(
      'Registered',
      'Your Card is Ready',
      'success'
    )


    loader.style.display = "none";
    content.style.display = "block"
  } catch (e) {
    console.error("Error adding document: ", e);

    loader.style.display = "none";
  }
});


//Card Verification


let getcard = document.getElementById("cardbtn")

let content2 = document.getElementById("content2")

getcard && getcard.addEventListener("click", async () => {

  let cardCnic = document.getElementById("card-cnic"); 

  const q = query(collection(db, "users"), where("cnic", "==", cardCnic.value));

if(q){
  const q = query(collection(db, "users"), where("cnic", "==", cardCnic.value));

  try {
    loader.style.display = "block";
    content2.style.display = "none"

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let studentcard = document.getElementById("studentCard");
      studentcard.style.display = "block";
      studentcard.innerHTML += `
     
  
      <div class="row">
        

          <img class="profile" src="images/user.png">
          <div class="information">
            <h3><u>NAME: </u> &nbsp ${doc.data().name}</h3>
            </br>
            <h3><u>FATHER NAME: </u> &nbsp ${doc.data().fname}</h3>
            </br>
            <h3><u>COURSE: </u> &nbsp ${doc.data().course}</h3>
            </br>
            <h3><u>CNIC NO: </u> &nbsp ${doc.data().cnic}</h3>
            </br>
          </div>
        </div>
      `;
      loader.style.display = "none";
      content2.style.display = "none";
    });
  }
  catch (e) {
    console.log("error", e);
  }


}


else{
  const notmatch = query(collection(db, "users"), where("cnic", "!=", cardCnic.value));

  try {
    loader.style.display = "block";
    content2.style.display = "none"

    const querySnapshot = await getDocs(notmatch);
    querySnapshot.forEach((doc) => {
      let studentcard = document.getElementById("studentCard");
     
      
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid CNIC',
      })

      loader.style.display = "none";
      content2.style.display = "block";
    });
  }
  catch (e) {
    console.log("error", e);
  }

}


});
