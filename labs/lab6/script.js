
const likeBtn = document.getElementById("like-btn");
const dislikeBtn = document.getElementById("dislike-btn");
const likeCount = document.getElementById("like-count");
const dislikeCount = document.getElementById("dislike-count");

const commentInput = document.getElementById("comment-input");
const submitBtn = document.getElementById("submit-btn");
const commentsList = document.getElementById("comments-list");
const resetBtn = document.getElementById("reset-btn");

// Cookie functions
function setCookie(name, value) {
    document.cookie = name + "=" +
        encodeURIComponent(value) +
        "; path=/; max-age=604800; SameSite=Lax";
}

function getCookie(name) {
    const cookies = document.cookie.split(";");

    for (let cookie of cookies) {
        const [key, ...parts] = cookie.trim().split("=");

        if (key === name) {
            return decodeURIComponent(parts.join("="));
        }
    }

    return null;
}

function deleteCookie(name) {
    document.cookie = name +
        "=; path=/; max-age=0; SameSite=Lax";
}

// Load saved vote and comment
let vote = getCookie("lab6_vote");
let comment = getCookie("lab6_comment");

// Update the page
function updateUI() {
    likeCount.textContent = vote === "like" ? 1 : 0;
    dislikeCount.textContent = vote === "dislike" ? 1 : 0;

    // Prevent multiple votes
    likeBtn.disabled = vote !== null;
    dislikeBtn.disabled = vote !== null;

    // Prevent multiple comments
    commentInput.disabled = comment !== null;
    submitBtn.disabled = comment !== null;

    commentsList.innerHTML = "";

    if (comment !== null) {
        const li = document.createElement("li");
        li.textContent = comment;
        commentsList.appendChild(li);
    }
}

// Like
likeBtn.addEventListener("click", function () {
    if (vote !== null) return;

    vote = "like";
    setCookie("lab6_vote", vote);
    updateUI();
});

// Dislike
dislikeBtn.addEventListener("click", function () {
    if (vote !== null) return;

    vote = "dislike";
    setCookie("lab6_vote", vote);
    updateUI();
});

// Submit comment
submitBtn.addEventListener("click", function () {
    if (comment !== null) return;

    const text = commentInput.value.trim();

    if (text === "") {
        alert("Please write a comment!");
        return;
    }

    comment = text;
    setCookie("lab6_comment", comment);

    commentInput.value = "";
    updateUI();
});

// Reset everything
resetBtn.addEventListener("click", function () {
    deleteCookie("lab6_vote");
    deleteCookie("lab6_comment");

    vote = null;
    comment = null;

    commentInput.value = "";

    updateUI();
    alert("Your vote and comment have been reset!");
});

// Initial display
updateUI();
