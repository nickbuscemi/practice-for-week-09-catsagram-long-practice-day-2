export const createMainContent = () => {
    // Create h1
    let score = 0;
    let comments = [];
    let updateScore = (score) => {
        scoreDisplay.innerText = `Popularity Score: ${score}`;
    }
    const h1 = document.createElement("h1");
    h1.innerText = "Catstagram";

    // Create img
    const img = document.createElement("img");
    img.style.margin = "20px";
    img.style.maxWidth = "750px";

    const container = document.querySelector(".container");
    container.appendChild(h1);
    container.appendChild(img);

    //load image
    fetchImage();

    //create new image button
    const newImageButton = document.createElement('button');
    newImageButton.innerText = "New Image";
    container.appendChild(newImageButton);

    //get new image when button clicked
    newImageButton.addEventListener("click", () => {
        fetchImage();
        score = 0;
        comments = [];
        commentsDisplay.innerText = "";
        updateScore(score);
    });

    
    //upvote downvote popularity score
    //score display
    const scoreDisplay = document.createElement('p');
    updateScore(score);
    container.appendChild(scoreDisplay);

    //upVote
    const upVoteButton = document.createElement('button');
    upVoteButton.id = 'upVote'
    upVoteButton.innerText = "Upvote"

    //downVote
    const downVoteButton = document.createElement('button');
    downVoteButton.id = 'downVote'
    downVoteButton.innerText = "Downvote"

    //append
    container.appendChild(upVoteButton);
    container.appendChild(downVoteButton);

    //update score
    upVoteButton.addEventListener('click', () => {
        score++;
        updateScore(score);
    });
    downVoteButton.addEventListener('click', () => {
        score--;
        updateScore(score);
    });


    // create comment input, submit and textbox
    // input
    const commentPrompt = document.createElement('p');
    commentPrompt.innerText = 'Comment:';
    const commentInput = document.createElement('input');
    commentInput.type = 'text';
    commentInput.placeholder = 'Add a comment';
    const submitButton = document.createElement('button');
    submitButton.innerText = 'Submit';
    const commentsDisplay = document.createElement("div");

    // append
    container.appendChild(commentPrompt);
    container.appendChild(commentInput);
    container.appendChild(submitButton);
    container.appendChild(commentsDisplay);

    // submit comment function
    const submitComment = () => {
        comments.push(commentInput.value);
        commentInput.value = "";

        commentsDisplay.innerText = "";
        const commentUl = document.createElement('ul');
        comments.forEach(comm => {
            const commentLi = document.createElement('li');
            commentLi.innerText = comm;
            commentUl.appendChild(commentLi);
            commentsDisplay.appendChild(commentUl);
        });
    };
    // eventListeners
    commentInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            submitComment();
            event.preventDefault();
        }
    });
    submitButton.addEventListener('click', submitComment);
};

const fetchImage = async () => {
    // Fetch image from API and set img url
    try {
        const kittenResponse = await fetch("https://api.thecatapi.com/v1/images/search?size=small");
        // Converts to JSON
        const kittenData = await kittenResponse.json();
        // console.log(kittenData);
        const kittenImg = document.querySelector("img");
        kittenImg.src = kittenData[0].url;
    } catch (e) {
        console.log("Failed to fetch image", e);
    }
};
