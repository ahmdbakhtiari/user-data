// ----------------------load Data------------------------- //
var siteUsers = [];
var usersTableBody = document.querySelector(".user-body");
// getItem From localStorage
var getItem = localStorage.getItem("Users");
//conditon for skip null localStorage
if (getItem != null && getItem != "") {
    //parse datas to push it in array
    var loadUser = JSON.parse(getItem);
    //push all data in siteUser array
    Object.values(loadUser).forEach(function (item) {
        siteUsers.push(item);
    });
}
loadData(siteUsers);
// ----------------------Elements And Vars------------------------- //
var closeModal = document.querySelectorAll(".close-modal");
var addUserBtns = document.querySelectorAll("#add-user-btn");
var addUserModal = document.querySelector(".add-modal");
var visitUserBtns = document.querySelectorAll("#visit-btn");
var visitUserContainer = document.querySelector(".visit-container");
var visitUserModal = document.querySelector(".visit-modal");
var editUserBtns = document.querySelectorAll("#edit-btn");
var editUserForm = document.querySelector(".edit-form");
var editUserModal = document.querySelector(".edit-modal");
var removeUserBtns = document.querySelectorAll("#remove-btn");
var removeUserModal = document.querySelector(".remove-modal");
var locationUserBtns = document.querySelectorAll("#location-btn");
var locationUserModal = document.querySelector(".location-modal");
var statisticUserBtns = document.querySelectorAll("#statistic-btn");
var statisticUserModal = document.querySelector(".statistic-modal");
var ctx = document.getElementById('myChart');
//add form inputs 
var addUserForm = document.querySelector("#add-form__btn");
var addInputName = document.querySelector(".add-form__name");
var addInputFamily = document.querySelector(".add-form__family");
var addInputIdentity = document.querySelector(".add-form__identity");
var addInputPhone = document.querySelector(".add-form__phone");
//search form inputs 
var searchUserForm = document.querySelector(".search");
var searchInputName = document.querySelector(".search__name");
var searchInputFamily = document.querySelector(".search__family");
var searchInputIdentity = document.querySelector(".search__identity");
var searchInputPhone = document.querySelector(".search__phone");
var searchBtn = document.querySelector(".search__btn");
var removeUser = document.querySelector("#remove-user");
var removeNotUser = document.querySelector("#remove-nuser");
var editFormBtn = document.querySelector("#edit-form__btn");
// ----------------------Show and hide modals with function------------------------- //
//this function is for show modals for all actions
function actionsHandler(btns, modal, callback) {
    btns.forEach(function (btn, index) {
        btn.addEventListener("click", function () {
            modal === null || modal === void 0 ? void 0 : modal.classList.add("modal-show");
            callback(index);
        });
    });
}
//this function is for hide modals for some actions
function closeHandler(index, modal) {
    var _a;
    (_a = closeModal[index]) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
        modal === null || modal === void 0 ? void 0 : modal.classList.remove("modal-show");
    });
}
function test() {
}
//show add User modal
actionsHandler(addUserBtns, addUserModal, test);
//hide add User modal
if (addUserModal) {
    closeHandler(0, addUserModal);
}
//show add visit modal
actionsHandler(visitUserBtns, visitUserModal, visitHandler);
//show add visit modal
function closeVisit() {
    visitUserContainer.innerHTML = "";
    visitUserModal === null || visitUserModal === void 0 ? void 0 : visitUserModal.classList.remove("modal-show");
}
//show add edit modal
actionsHandler(editUserBtns, editUserModal, editHandler);
//show add edit modal
function closeEdit() {
    editUserForm.innerHTML = "";
    editUserModal === null || editUserModal === void 0 ? void 0 : editUserModal.classList.remove("modal-show");
}
//show add location modal
actionsHandler(locationUserBtns, locationUserModal, test);
//show add location modal
if (locationUserModal) {
    closeHandler(1, locationUserModal);
}
//show add remove modal
actionsHandler(removeUserBtns, removeUserModal, removeHandler);
//show add remove modal
if (removeUserModal) {
    closeHandler(2, removeUserModal);
}
//show add statistic modal
actionsHandler(statisticUserBtns, statisticUserModal, statisticHandler);
//show add statistic modal
if (statisticUserModal) {
    closeHandler(3, statisticUserModal);
}
searchBtn === null || searchBtn === void 0 ? void 0 : searchBtn.addEventListener("click", function () {
    var searchedUser = siteUsers;
    var tHeadStr = "\n        <tr class=\"user-row\">\n            <th>\u0631\u062F\u06CC\u0641</th>\n            <th>\u0646\u0627\u0645</th>\n            <th>\u0646\u0627\u0645 \u062E\u0627\u0646\u0648\u0627\u062F\u06AF\u06CC</th>\n            <th>\u06A9\u062F \u0645\u0644\u06CC</th>\n            <th>\u0634\u0645\u0627\u0631\u0647 \u062A\u0644\u0641\u0646</th>\n            <th>\u0639\u0645\u0644\u06CC\u0627\u062A</th>\n        </tr>";
    if (searchInputName != null && searchInputName.value != "" && searchInputFamily != null && searchInputFamily.value != "") {
        searchedUser = siteUsers.filter(function (user) {
            return user.name == (searchInputName === null || searchInputName === void 0 ? void 0 : searchInputName.value) && user.family == (searchInputFamily === null || searchInputFamily === void 0 ? void 0 : searchInputFamily.value) || user.identity == (searchInputIdentity === null || searchInputIdentity === void 0 ? void 0 : searchInputIdentity.value) || user.phone == (searchInputPhone === null || searchInputPhone === void 0 ? void 0 : searchInputPhone.value);
        });
    }
    else if (searchInputName != null && searchInputName.value == "" && searchInputFamily != null && searchInputFamily.value == "" && searchInputIdentity != null && searchInputIdentity.value == "" && searchInputPhone != null && searchInputPhone.value == "") {
        //save our new array in our local storage and reload page
        localStorage.setItem("Users", JSON.stringify(siteUsers));
        location.reload();
    }
    else {
        alert("نام و نام خانوادگی خود را وارد کنید");
    }
    usersTableBody.innerHTML = tHeadStr;
    loadData(searchedUser);
});
// ----------------------actions in modals------------------------- //
//add user action
addUserForm === null || addUserForm === void 0 ? void 0 : addUserForm.addEventListener("click", function () {
    //condition to check inputs are not null
    if (addInputName != null && addInputName.value != "" && addInputFamily != null && addInputFamily.value != "" && addInputIdentity != null && addInputIdentity.value != "" && addInputPhone != null && addInputPhone.value != "") {
        //create an object 
        var user = {
            name: addInputName.value,
            family: addInputFamily.value,
            identity: addInputIdentity.value,
            phone: addInputPhone.value
        };
        //save this object in our array
        siteUsers.push(user);
        //save our array in local storage
        localStorage.setItem("Users", JSON.stringify(siteUsers));
        //reload page
        location.reload();
    }
    else {
        alert("one input or more is null\n        please full all inputs");
    }
});
//visit user action
function visitHandler(index) {
    //create jsx to show our user in visit modal
    console.log(index);
    var dataVisit = "\n    <img class=\"close-modal \" onclick=\"closeVisit()\" src=\"../../image/svg/close.svg\" alt=\"Close\" />\n    <div>\n        <h3>\u0646\u0627\u0645 : </h3>\n        <p>".concat(siteUsers[index].name, "</p>\n    </div>\n    <div>\n        <h3>\u0646\u0627\u0645 \u062E\u0627\u0646\u0648\u0627\u062F\u06AF\u06CC : </h3>\n        <p>").concat(siteUsers[index].family, "</p>\n    </div>\n    <div>\n        <h3>\u06A9\u062F \u0645\u0644\u06CC : </h3>\n        <p>").concat(siteUsers[index].identity, "</p>\n    </div>\n    <div>\n        <h3>\u0634\u0645\u0627\u0631\u0647 \u062A\u0644\u0641\u0646 : </h3>\n        <p>").concat(siteUsers[index].phone, "</p>\n    </div>");
    //add our jsx in our html element
    visitUserContainer === null || visitUserContainer === void 0 ? void 0 : visitUserContainer.insertAdjacentHTML("beforeend", dataVisit);
}
//remove user action
function removeHandler(index) {
    //set listener for remove btn 
    removeUser === null || removeUser === void 0 ? void 0 : removeUser.addEventListener("click", function () {
        //remove that data with splice method 
        siteUsers.splice(index, index + 1);
        //save our new array in our local storage and reload page
        localStorage.setItem("Users", JSON.stringify(siteUsers));
        location.reload();
    });
}
//edit user to show action
function editHandler(index) {
    //create jsx to show our user data in edit modal with index
    var dataEdit = "\n    <img class=\"close-modal\" onclick=\"closeEdit()\" src=\"../../image/svg/close.svg\" alt=\"Close\" />\n    <div>\n        <input class=\"edit-form__name\" type=\"text\" value = ".concat(siteUsers[index].name, " placeholder=\"\u0646\u0627\u0645\" />\n        <input class=\"edit-form__family\" type=\"text\" value = ").concat(siteUsers[index].family, " placeholder=\"\u0646\u0627\u0645 \u062E\u0627\u0646\u0648\u0627\u062F\u06AF\u06CC\" />\n    </div>\n    <div>\n        <input class=\"edit-form__identity\" type=\"text\" value = ").concat(siteUsers[index].identity, " placeholder=\"\u06A9\u062F \u0645\u0644\u06CC\" />\n        <input class=\"edit-form__phone\" type=\"text\" value = ").concat(siteUsers[index].phone, " placeholder=\"\u0634\u0645\u0627\u0631\u0647 \u062A\u0644\u0641\u0646\" />\n    </div>\n    <button class=\"edit-form__btn\" onclick = \"editFormFun(").concat(index, ")\" type=\"button\">\u0627\u0646\u062C\u0627\u0645 \u0648\u06CC\u0631\u0627\u06CC\u0634</button>\n    ");
    //add our jsx in our html element
    editUserForm === null || editUserForm === void 0 ? void 0 : editUserForm.insertAdjacentHTML("afterbegin", dataEdit);
}
//edit user action
function editFormFun(index) {
    //get data from inputs
    var editInputName = document.querySelector(".edit-form__name");
    var editInputFamily = document.querySelector(".edit-form__family");
    var editInputIdentity = document.querySelector(".edit-form__identity");
    var editInputPhone = document.querySelector(".edit-form__phone");
    //set condition to our inputs that are not null
    if (editInputName != null && editInputName.value != "" && editInputFamily != null && editInputFamily.value != "" && editInputIdentity != null && editInputIdentity.value != "" && editInputPhone != null && editInputPhone.value != "") {
        //set new data in our array which we get from local storage
        siteUsers[index].name = editInputName.value;
        siteUsers[index].family = editInputFamily.value;
        siteUsers[index].identity = editInputIdentity.value;
        siteUsers[index].phone = editInputPhone.value;
        //save new data in our local storage and reload page
        localStorage.setItem("Users", JSON.stringify(siteUsers));
        location.reload();
    }
    else {
        alert("Fill all inputs");
    }
}
// statistic action
function statisticHandler() {
    // for test we set random number in vars
    var num1 = Math.floor(Math.random() * 100);
    var num2 = Math.floor(Math.random() * 100);
    var num3 = Math.floor(Math.random() * 100);
    var num4 = Math.floor(Math.random() * 100);
    //we set our data in data 
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['امروز', 'دیروز', 'دو روز قبل', 'سه روز قبل'],
            datasets: [{
                    label: '# of Votes',
                    data: [num1, num2, num3, num4],
                    borderWidth: 2
                }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    //hide statistic modal action
    closeModal[3].addEventListener("click", function () {
        myChart.destroy();
    });
}
// ----------------------devide functions------------------------- //
function loadData(array) {
    var counter = 0;
    //condition for data which not null
    if (array) {
        //create row for each data in out table 
        array.forEach(function (user) {
            usersTableBody === null || usersTableBody === void 0 ? void 0 : usersTableBody.insertAdjacentHTML("beforeend", "<tr class=\"user-row\">\n                <td>".concat(counter, "</td>\n                <td>").concat(user.name, "</td>\n                <td>").concat(user.family, "</td>\n                <td>").concat(user.identity, "</td>\n                <td>").concat(user.phone, "</td>\n                <td class=\"user-row__action\">\n                    <img id=\"visit-btn\" src=\"../../image/svg/visit.svg\" alt=\"visit\" />\n                    <img id=\"edit-btn\" src=\"../../image/svg/edit.svg\" alt=\"edit\" />\n                    <img id=\"location-btn\" src=\"../../image/svg/location.svg\" alt=\"location\" />\n                    <img id=\"remove-btn\" src=\"../../image/svg/remove.svg\" alt=\"remove\" />\n                    <img id=\"statistic-btn\" src=\"../../image/svg/statistic.svg\" alt=\"statistic\" />\n                </td>\n                </tr>"));
            counter += 1;
        });
    }
}
