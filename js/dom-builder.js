"use strict";

let $ = require('jquery');
let user = require("./user");

function printListToDom(symptomsList){
  //console.log("symptomsList1", symptomsList);
 user.getUser();
  let symptomListRender =
   $(`<div class="card symptom-card">
     <div class="card-body" id="myHistory1">
       <h5 class="card-title symptomsHeading1">Symptoms to track</h5>
       <p class="card-text symptomsSubHeading1">Begin by choosing upto 4 symptoms to manage.</p>
       <ul class="list-group list-group-flush symptomsDisplay" id="symptomData"></ul>
     </div>
   </div>`);
   $(".card1").html(symptomListRender);
   for (var i=0; i < 12; i++){
    let symptomNames = symptomsList;
      console.log("Symptom Name:", symptomNames[i].name);
      $('#symptomData').append(`<li class="list-group-item symptomsDisplay" name="symName">
      <input class="singlecheckbox" type="checkbox" name="symCheckName" value="${symptomNames[i].name}" id="${symptomNames[i].name}"/>${symptomNames[i].name}</li>`);
  }
      let historyDisplay =
        $(`<div class="card">
            <div class="card-body box-right">
              <h5 class="card-title symptomsHeading1">My Medical Info</h5>
                <p class="card-text symptomsSubHeading1">Fill in the following form</p>
                  <div class="symptom-card-text" id="enterHistory">
                
                  </div>
                  
            </div>
          </div>`);
        $(".box-right1").html(historyDisplay);
      let form =
        $(`<form class="row form-container" id="submit-history" method="get">
        <div class="form-group">
              <label class="symptomsHeading1"><b>Symptom Onset Date:</b></label><br>
              <input type="date" class="form-control" id="form-date" placeholder="date" value=""><br>
          </div>
          <div class="form-group">
              <label class="symptomsHeading1"><b>List all current Medications:</label><br>
              <input type="text" class="form-control" id="form-medication1" placeholder="medication #1" value=""><br>
              <input type="text" class="form-control" id="form-medication2" placeholder="medication #2" value=""><br>
              <input type="text" class="form-control" id="form-medication3" placeholder="medication #3" value=""><br>
          </div>
          <div class="form-group">
              <label class="symptomsHeading1">Physician Visited:</label><br>
              <input type="text" class="form-control" id="form-physician1" placeholder="physician #1" value=""><br>
              <input type="text" class="form-control" id="form-physician2" placeholder="physician #2" value=""><br>
          </div>
          <button type="button" class="btn btn-primary save_new_btn" id="submitHistory">Submit</button>
          </form>`);
        $(".symptom-card-text").html(form);

}

// var symSelected = [];
// var printTheSym = "";

//       // https://www.youtube.com/watch?v=B1X5oMUxEeI
      
//         $(".singlecheckbox").change(function()  {
//                console.log("event listener attached");
//                console.log("checked this", this);
//               var thisChecked = $(this).val();
//               symSelected.push(thisChecked);
//               console.log("thisChecked", thisChecked );
//               console.log("symSelected", symSelected);      
//         });

// for (var i=0; i < symSelected.length; i++){
//   printTheSym += "<br>"+symSelected[i];
//   console.log("printTheSym", printTheSym);
// }
 
  // return printTheSym;// <-- to be printed to the div



// document.getElementById("symTrakList").innerHTML = printSymTrakListToDom();
  

    function createHistoryFormList(historyList) {
      let viewSymTrakOnDom = 
      $(`<div class="row viewSymptomList  viewLiveChart">
        <div class="col-sm-5  viewSymptomList">
          <div class="card symptom-list">
            <div class="card-body" id="myHistory1">
                <h5 class="card-title symptomsHeading1">Track Your Symptom</h5>
                <p class="card-text symptomsSubHeading1">Select your intensity for today</p>
                <p id="symTrakList"></p>
                              
          </div>
          </div>
          <div class="card symptom-card medical-info">
          
        </div>
        </div> 
        <div class="col-sm-7">
           <div class="card symptom-card">
               <div class="card-body chartDisplay" id="myHistory1">
                                  
               </div>
           </div>
           </div>
         </div>`);
      $(".track-symptom1").html(viewSymTrakOnDom);
      
      let medicationList =
      $(`<div class="card-body" id="myHistory1">
        <h5 class="card-title symptomsHeading1">Your Current Medication Info:</h5>
      
        <ul class="history-list">
        </ul>        
        </div>`);
      $(".medical-info").html(medicationList);
     for (let history in historyList ) {
        let currentHistory = historyList[history],
            historyListItem = $("<li>", {class: "history-list__item"}),
            title = $("<span/>", {class: "history-title"}).text(currentHistory.title),
            historyListData = $("<ul/>", {class: "history-list__item--data"}),
            historyListEdit = $("<a>", {"data-edit-id": history, class: "edit-btn waves-effect waves-light btn", text: "edit" }),
            historyListDelete = $("<a>", {"data-delete-id": history, class: "delete-btn waves-effect waves-light btn", text: "delete" });
            
            historyListData.append(
          `<p>Symptom Onset:${currentHistory.date}</p>
          <li>${currentHistory.medication1}</li>
          <li>${currentHistory.medication2}</li>
          <li>${currentHistory.medication3}</li>
          <li>${currentHistory.physician1}</li>
          <li>${currentHistory.physician2}</li>`);
        // $(".history-list").append(historyListItem.append(title));
        $(".history-list").append(historyListItem.append(historyListData).append(historyListDelete).append(historyListEdit));
        console.log("currentHistory", currentHistory);
      }
    }
     
    


    function historyForm(history, historyId) {
      return new Promise(function (resolve, reject) {

        let historyItem = {
          date: history ? history.date : "",
          medication1 : history ? history.medication1 : "",
          medication2: history ? history.medication2 : "",
          medication3: history ? history.medication3 : "",
          physician1: history ? history.physician1 : "",
          physician2: history ? history.physician2 : "",
          // formTitle: history ? `Edit "${history.title}"` : "Add a new history",
          btnText: history ? "save changes" : "save history",
          btnId: history ? "save_edit_btn" : "save_new_btn"
        },
        
        form =
        `<form class="row form-container" id="submit-history" method="get">
        <div class="form-group">
            <label class="symptomsHeading1">Symptom Onset Date:</label><br>
            <input type="date" class="form-control" id="form-date" placeholder="date" value="${historyItem.date}"><br>
        </div>
        <div class="form-group">
            <label class="symptomsHeading1">List All Current Medications:</label><br>
            <input type="text" class="form-control" id="form-medication1" placeholder="medication #1" value="${historyItem.medication1}"></input><br>
            <input type="text" class="form-control" id="form-medication2" placeholder="medication #2" value="${historyItem.medication2}"></input><br>
            <input type="text" class="form-control" id="form-medication3" placeholder="medication #3" value="${historyItem.medication3}"></input><br>
            
        </div>
        <div class="form-group">
            <label class="symptomsHeading1">Physician Visited:</label><br>
            <input type="text" class="form-control" id="form-physician1" placeholder="physician #1" value="${historyItem.physician1}"></input><br>
            <input type="text" class="form-control" id="form-physician2" placeholder="physician #2" value="${historyItem.physician2}"></input><br>
        </div>
        <button id="${historyId}" class="${historyItem.btnId}">${historyItem.btnText}</button>
        </form>`;
        // $(".symptom-card-text").html(form);
        resolve(form);
        console.log("this is the history form", form);
        // return printListToDom();
        
      });
      
    }
  

module.exports = {
  printListToDom,
  createHistoryFormList,
  historyForm,
  // printSymTrakListToDom
  };
