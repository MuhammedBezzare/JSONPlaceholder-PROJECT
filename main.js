let buttons = document.querySelectorAll(".-btn");

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", () => {
    buttons.forEach((e, index) => {
      e.classList.remove("active");
    });
    buttons[i].classList.add("active");
  });
}

// variables

const BODY = document.body;
const browsContent = document.querySelector(".brows-content");
const addContent = document.querySelector(".add-content");
const deleteContent = document.querySelector(".delete-content");
const updateContent = document.querySelector(".update-content");

//USERS

let users = {};

let usersRequest = new XMLHttpRequest();
usersRequest.open("GET", "https://jsonplaceholder.typicode.com/users");
usersRequest.onload = () => {
  if (usersRequest.status >= 200 && usersRequest.status <= 300) {
    let usersData = JSON.parse(usersRequest.response);
    // get the parent
    let usersArea = document.querySelector(".users-area");
    // set the counter
    let i = 0;
    usersData.forEach((data, indx) => {
      i++;
      // make the elements
      let userDiv = document.createElement("div");
      let userImg = document.createElement("img");
      let userH3 = document.createElement("h3");
      let userH4 = document.createElement("h4");
      // Giving them ther classes
      userDiv.classList.add("user");

      // Set the Value
      userDiv.setAttribute("data-user-ID", data.id);
      userH3.innerHTML = data.username;
      userH4.innerHTML = data.email;
      userImg.src = `./assets/images/user-photo-${i}.jpg`;
      // Appanding them
      userDiv.appendChild(userImg);
      userDiv.appendChild(userH3);
      userDiv.appendChild(userH4);
      usersArea.appendChild(userDiv);

      userDiv.addEventListener("click", () => {
        let userId = userDiv.getAttribute("data-user-ID");
        let searchByIdRequest = new XMLHttpRequest();
        searchByIdRequest.open(
          "GET",
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
        );
        searchByIdRequest.responseType = "json";
        searchByIdRequest.onload = () => {
          const postArea = document.querySelector(".post-area");
          postArea.innerHTML = "";

          if (
            searchByIdRequest.status >= 200 &&
            searchByIdRequest.status <= 300
          ) {
            // set a success notification
            makeSuccessNotification("connected");

            // Wright The code here
            let respon = searchByIdRequest.response;
            respon.forEach((v, i) => {
              // create post elements
              // mean post element
              const searchPost = document.createElement("div");
              searchPost.classList.add("post");
              searchPost.setAttribute("data-id", `${v.id}`);
              // post title
              const postTitle = document.createElement("div");
              postTitle.classList.add("post-title");
              postTitle.textContent = v.title;
              // post Body
              const postBody = document.createElement("div");
              postBody.classList.add("post-body");
              postBody.innerHTML = v.body;
              searchPost.append(postTitle, postBody);
              postArea.appendChild(searchPost);
            });
          } else {
            //Send Error
            makeErrorNotification("Error");
          }
        };
        searchByIdRequest.send();
      });
    });
  } else {
    makeErrorNotification("Error");
  }
};
usersRequest.send();

// SEARCH BY USER ID

// BROWS

let BROWS = document.querySelector(".brows");

// When the page load

if (BROWS.classList.contains("active")) {
  // add display none to the other content divs
  addContent.style.display = "none";
  deleteContent.style.display = "none";
  updateContent.style.display = "none";
  // add display block to the content
  browsContent.style.display = "block";
  // add the animation

  // Start HTTPS Request
  let request = new XMLHttpRequest();
  request.open("GET", "https://jsonplaceholder.typicode.com/posts");
  request.responseType = "json";
  request.onload = () => {
    if (request.status >= 200 && request.status <= 300) {
      // set a success notification
      makeSuccessNotification("connected");
      // Wright The code here
      let resp = request.response;
      resp.forEach((v, i) => {
        // create post elements
        // mean post element
        const post = document.createElement("div");
        post.classList.add("post");
        post.setAttribute("data-id", `${v.id}`);
        // post title
        const postTitle = document.createElement("div");
        postTitle.classList.add("post-title");
        postTitle.textContent = v.title;
        // post Body
        const postBody = document.createElement("div");
        postBody.classList.add("post-body");
        postBody.innerHTML = v.body;
        post.append(postTitle, postBody);
        const postArea = document.querySelector(".post-area");
        postArea.appendChild(post);
      });
    } else {
      //Send Error
      makeErrorNotification("Error");
    }
  };
  request.send();
}
// when brows button get clicked
BROWS.addEventListener("click", () => {
  if (BROWS.classList.contains("active")) {
    // reset the bg
    BODY.style.backgroundColor = "var(--brows-bg)";
    // add display none to the other content divs
    addContent.style.display = "none";
    deleteContent.style.display = "none";
    updateContent.style.display = "none";
    // add display block to the content

    browsContent.style.display = "block";
    // add the animation

    // Start HTTPS Request
    let request = new XMLHttpRequest();
    request.open("GET", "https://jsonplaceholder.typicode.com/posts");
    request.responseType = "json";
    request.onload = () => {
      if (request.status >= 200 && request.status <= 300) {
        // set a success notification
        makeSuccessNotification("connected");

        // Wright The code here
        let resp = request.response;
        resp.forEach((v, i) => {
          // create post elements
          // mean post element
          const post = document.createElement("div");
          post.classList.add("post");
          post.setAttribute("data-id", `${v.id}`);
          // post title
          const postTitle = document.createElement("div");
          postTitle.classList.add("post-title");
          postTitle.textContent = v.title;
          // post Body
          const postBody = document.createElement("div");
          postBody.classList.add("post-body");
          postBody.innerHTML = v.body;
          post.append(postTitle, postBody);
          const postArea = document.querySelector(".post-area");
          postArea.appendChild(post);
        });
      } else {
        //Send Error
        makeErrorNotification("Error");
      }
    };
    request.send();
  }
});

// ADD

let ADD = document.querySelector(".add");

ADD.addEventListener("click", () => {
  BODY.style.backgroundColor = "var(--add-bg)";

  // set the other areas to display none
  browsContent.style.display = "none";
  deleteContent.style.display = "none";
  updateContent.style.display = "none";
  // set the add-area to display block
  addContent.style.display = "flex";
});

let addBtn = document.querySelector(".add-btn");
addBtn.addEventListener("click", () => {
  let addPostTitle = document.querySelector("#post-title");
  let addPostBody = document.querySelector("#post-body");

  let addRequest = new XMLHttpRequest();
  addRequest.open("POST", "https://jsonplaceholder.typicode.com/posts");
  addRequest.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded"
  );
  addRequest.onload = () => {
    if (addRequest.status >= 200 && addRequest.status <= 300) {
      makeSuccessNotification("Yuor Post Has ben aded");
      addPostTitle.value = "";
      addPostBody.value = "";
    } else {
      makeErrorNotification("something went wrong");
    }
  };
  const data = {
    title: `${addPostTitle.value}`,
    body: `${addPostBody.value}`,
  };
  // turn the data into string
  dataValue = JSON.stringify(data);
  //send th data
  addRequest.send(data);
});

// DELETE

let DELETE = document.querySelector(".delete");

DELETE.addEventListener("click", () => {
  BODY.style.backgroundColor = "var(--delete-bg)";

  // set the other areas to display none
  browsContent.style.display = "none";
  addContent.style.display = "none";
  addContent.style.display = "none";
  updateContent.style.display = "none";
  // set the add-area to display block
  deleteContent.style.display = "flex";
});

let deleteBtn = document.querySelector(".delete-btn");
deleteBtn.addEventListener("click", () => {
  let deletePostId = document.querySelector("#post-ID");
  let deleteId = deletePostId.value;
  let deleteRequest = new XMLHttpRequest();
  deleteRequest.open(
    "DELETE",
    `https://jsonplaceholder.typicode.com/posts/${deleteId}`
  );
  deleteRequest.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded"
  );
  deleteRequest.onload = () => {
    console.log(deleteRequest.status);
    if (deleteRequest.status >= 200 && deleteRequest.status <= 300) {
      makeSuccessNotification("Yuor Post Has ben deleted");
      deletePostId.value = "";
    } else {
      makeErrorNotification("something went wrong");
    }
  };
  deleteRequest.send();
});

// UPDATE

let UPDATE = document.querySelector(".update");

UPDATE.addEventListener("click", () => {
  BODY.style.backgroundColor = "var(--update-bg)";

  // set the other areas to display none
  browsContent.style.display = "none";
  addContent.style.display = "none";
  deleteContent.style.display = "none";
  //updateContent.style.display = "none";
  // set the add-area to display block
  updateContent.style.display = "flex";
});

let updateBtn = document.querySelector(".update-btn");
updateBtn.addEventListener("click", () => {
  let updatePostId = document.querySelector("#post-update-ID");
  let updateID = updatePostId.value;
  let updatePostTitle = document.querySelector("#post-update-title");
  let updatePostBody = document.querySelector("#post-update-body");
  let updateRequest = new XMLHttpRequest();
  updateRequest.open(
    "PUT",
    `https://jsonplaceholder.typicode.com/posts/${updateID}`
  );
  updateRequest.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded"
  );
  updateRequest.onload = () => {
    console.log(updateRequest.status);
    if (updateRequest.status >= 200 && updateRequest.status <= 300) {
      makeSuccessNotification("Yuor Post Has ben updated");
      updatePostId.value = "";
      updatePostTitle.value = "";
      updatePostBody.value = "";
    } else {
      makeErrorNotification("something went wrong");
    }
  };
  const updateData = {
    title: `${updatePostTitle.value}`,
    body: `${updatePostBody.value}`,
  };
  // turn the data into string
  let updateDataValue = JSON.stringify(updateData);
  //send th data
  updateRequest.send(updateDataValue);
});
//Notifications
function makeErrorNotification(errorText) {
  let error = document.createElement("div");
  error.classList.add("error");
  error.textContent = errorText;
  let heaer = document.querySelector("#header");
  heaer.appendChild(error);
}

function makeSuccessNotification(successText) {
  let success = document.createElement("div");
  success.classList.add("success");
  success.textContent = successText;
  let heaer = document.querySelector("#header");
  heaer.appendChild(success);
}
