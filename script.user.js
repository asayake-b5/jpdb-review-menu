// ==UserScript==
// @name         JPDB Review
// @namespace    https://jpdb.io
// @version      0.2
// @description  add a review menu to jpdb
// @author       You
// @match        https://jpdb.io/vocabulary/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

// Thanks Max wwwww
window.review = async (n) => {
    const vid = document.querySelector("input[name=\"v\"]").value;
    const sid = document.querySelector("input[name=\"s\"]").value;

    const response = await fetch(`https://jpdb.io/review?c=vf%2C${vid}%2C${sid}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            Accept: '*/*',
        },
    });

    if (response.status >= 400) {
        alert(`HTTP error ${response.statusText} while getting next review number for word ${vid}/${sid}`);
    }

    const doc = new DOMParser().parseFromString(await response.text(), 'text/html');
    if (doc.querySelector('a[href="/login"]') !== null){
        alert(`You are not logged in to jpdb.io - Reviewing cards requires being logged in`);
    }

     const reviewNoInput = doc.querySelector(
        'form[action^="/review"] input[type=hidden][name=r]',
    );

    if(reviewNoInput == null) {
        alert ("uhhh");
        return;
    }

    const reviewNo = parseInt(reviewNoInput.value);

    const reviewResponse = await fetch('https://jpdb.io/review', {
        method: 'POST',
        credentials: 'include',
        headers: {
            Accept: '*/*',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `c=vf%2C${vid}%2C${sid}&r=${reviewNo}&g=${n}`, // &force=true
    });
    location.reload();
}

const reviewMenu = `
<br>
<br>
<div class="dropdown">
<details>
<summary>Review</summary>
<div class="dropdown-content">
<ul>
<li>
  <a href="javascript:;" onclick="review(1)">Nothing</a>
</li>
<li>
  <a href="javascript:;" onclick="review(2)">Something</a>
</li>
<li>
  <a href="javascript:;" onclick="review(3)">Hard</a>
</li>
<li>
  <a href="javascript:;" onclick="review(4)">Good</a>
</li>
<li>
  <a href="javascript:;" onclick="review(5)">Easy</a>
</li>
</ul>
</div>
</details>
</div>
`;

(function() {
    'use strict';
    let menu = document.querySelector("div.menu:nth-child(3)");
    menu.insertAdjacentHTML('beforeend', reviewMenu);



    // Your code here...
})();
