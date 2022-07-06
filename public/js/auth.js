const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});




// const selectElement= document.getElementById("select-all");
// selectElement.addEventListener('change', (event) => {
//     console.log(event);
//     if (event.value == "ngo") {
//         document.getElementById("ifYes").style.display = "block";
//         document.getElementById("ifY").style.display = "none";
//       }

//       else if(event.value== "hotel");
//       {
//         document.getElementById("ifYes").style.display = "none";
//         document.getElementById("ifY").style.display = "block";
//       }

//   });

function yesnoCheck(that) {
  if (that.value == "reguser") {
    console.log("regular");
    document.getElementById("ifYes").style.display = "none";
    document.getElementById("ifY").style.display = "none";
  }
  else if (that.value == "ngo") {
    console.log("ngo");
    document.getElementById("ifYes").style.display = "block";
    document.getElementById("ifY").style.display = "none";
  }

  else if (that.value == "hotel") {
    console.log("hotel");
    document.getElementById("ifYes").style.display = "none";
    document.getElementById("ifY").style.display = "block";
    
  }



}

