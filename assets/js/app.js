/* Coded By https://github.com/msfpt */

import { Game } from "./game.js";

document.addEventListener('DOMContentLoaded', event => {

    const app = document.body;

    app.id = 'app';

    const game = new Game(app);

    game.start();

    var github_repo_link = document.createElement('a');
    github_repo_link.id = "github_link";
    github_repo_link.target = "_blank";
    github_repo_link.href = "https://github.com/msfpt/TicTacToe/";
    github_repo_link.title = "Github Page MsfPt";

    fetch("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIj4KICAgIDxwYXRoIGZpbGw9IiMwMDAiIGQ9Ik04IDBDMy41OCAwIDAgMy41OCAwIDhjMCAzLjU0IDIuMjkgNi41MyA1LjQ3IDcuNTkuNC4wNy41NS0uMTcuNTUtLjM4IDAtLjE5LS4wMS0uODItLjAxLTEuNDktMi4wMS4zNy0yLjUzLS40OS0yLjY5LS45NC0uMDktLjIzLS40OC0uOTQtLjgyLTEuMTMtLjI4LS4xNS0uNjgtLjUyLS4wMS0uNTMuNjMtLjAxIDEuMDguNTggMS4yMy44Mi43MiAxLjIxIDEuODcuODcgMi4zMy42Ni4wNy0uNTIuMjgtLjg3LjUxLTEuMDctMS43OC0uMi0zLjY0LS44OS0zLjY0LTMuOTUgMC0uODcuMzEtMS41OS44Mi0yLjE1LS4wOC0uMi0uMzYtMS4wMi4wOC0yLjEyIDAgMCAuNjctLjIxIDIuMi44Mi42NC0uMTggMS4zMi0uMjcgMi0uMjcuNjggMCAxLjM2LjA5IDIgLjI3IDEuNTMtMS4wNCAyLjItLjgyIDIuMi0uODIuNDQgMS4xLjE2IDEuOTIuMDggMi4xMi41MS41Ni44MiAxLjI3LjgyIDIuMTUgMCAzLjA3LTEuODcgMy43NS0zLjY1IDMuOTUuMjkuMjUuNTQuNzMuNTQgMS40OCAwIDEuMDctLjAxIDEuOTMtLjAxIDIuMiAwIC4yMS4xNS40Ni41NS4zOEE4LjAxMyA4LjAxMyAwIDAwMTYgOGMwLTQuNDItMy41OC04LTgtOHoiPjwvcGF0aD4KPC9zdmc+")
        .then(res => res.blob()) // Gets the response and returns it as a blob
        .then(blob => {
            // Here's where you get access to the blob
            // And you can use it for whatever you want
            // Like calling ref().put(blob)

            // Here, I use it to make an image appear on the page
            let objectURL = URL.createObjectURL(blob);
            
            var github_mark = new Image();
            github_mark.loading = "lazy";
            github_mark.src = objectURL;
            github_mark.title = "Github Page MsfPt";
            github_mark.alt = github_mark.title;

            github_repo_link.appendChild(github_mark);
        });

    app.appendChild(github_repo_link);

});

// document.addEventListener('contextmenu', event => event.preventDefault(), false);

// document.addEventListener('keypress', event => event.preventDefault(), false);

// document.addEventListener('keydown', event => event.preventDefault(), false);

// document.addEventListener('keyup', event => event.preventDefault(), false);