// (function () {
//     if (document.getElementById("citadel")) { return; }
//     const script = document.createElement("script");
//     script.id = "citadel";

//     document.head.appendChild(script);


//     function citadelHandler() {}
    
//     if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", citadelHandler); } else { citadelHandler(); }
// })();


// /*
// function initializeChat() {
//         console.log("Initializing chat...")
//         // Create chat button
//         const chatButton = document.createElement("button");
//         chatButton.id = "openChat";
//         chatButton.textContent = "Chat";
//         document.body.appendChild(chatButton);

//         // Create chat modal
//         const chatModal = document.createElement("div");
//         chatModal.id = "chatModal";
//         chatModal.className = "modal";

//         const modalContent = document.createElement("div");
//         modalContent.className = "modal-content";

//         const closeButton = document.createElement("span");
//         closeButton.className = "close";
//         closeButton.id = "closeChat";
//         closeButton.textContent = "×";

//         const chatContent = document.createElement("div");
//         chatContent.id = "chatContent";
//         chatContent.textContent = "Welcome to the chat!";

//         modalContent.appendChild(closeButton);
//         modalContent.appendChild(chatContent);
//         chatModal.appendChild(modalContent);

//         document.body.appendChild(chatModal);

//         // Display chat modal when the button is clicked
//         chatButton.addEventListener("click", function () {
//             chatModal.style.display = "block";
//         });

//         // Hide chat modal when the close button is clicked
//         closeButton.addEventListener("click", function () {
//             chatModal.style.display = "none";
//         });

//         // Hide chat modal when clicking outside the modal
//         window.addEventListener("click", function (event) {
//             if (event.target === chatModal) {
//                 chatModal.style.display = "none";
//             }
//         });
//     }
// */