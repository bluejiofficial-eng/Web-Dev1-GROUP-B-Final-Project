(function () {
  "use strict";

  function initializeInvestmentsModule() {
    var module = document.getElementById("inv-investments");

    if (!module) {
      return;
    }

    var viewOptionsButton = document.getElementById("inv-view-options-btn");
    var applyNowButton = document.getElementById("inv-apply-now-btn");
    var optionsSection = document.getElementById("inv-options");
    var modal = document.getElementById("inv-modal");
    var modalTitle = document.getElementById("inv-modal-title");
    var modalDescription = document.getElementById("inv-modal-description");
    var modalMinimum = document.getElementById("inv-modal-minimum");
    var modalTerm = document.getElementById("inv-modal-term");
    var modalBenefit = document.getElementById("inv-modal-benefit");
    var learnButtons = module.querySelectorAll(".inv-learn-btn");
    var closeButtons = module.querySelectorAll("[data-inv-close-modal]");

    function openModal(button) {
      if (!modal) {
        return;
      }

      modalTitle.textContent = button.getAttribute("data-inv-plan") || "Investment Plan";
      modalDescription.textContent = button.getAttribute("data-inv-description") || "";
      modalMinimum.textContent = button.getAttribute("data-inv-minimum") || "";
      modalTerm.textContent = button.getAttribute("data-inv-term") || "";
      modalBenefit.textContent = button.getAttribute("data-inv-benefit") || "";

      modal.classList.add("inv-modal-active");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("inv-modal-open");
    }

    function closeModal() {
      if (!modal) {
        return;
      }

      modal.classList.remove("inv-modal-active");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("inv-modal-open");
    }

    if (viewOptionsButton && optionsSection) {
      viewOptionsButton.addEventListener("click", function () {
        optionsSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });
    }

    if (applyNowButton) {
      applyNowButton.addEventListener("click", function () {
        alert("Applications are available through the Membership section.");
      });
    }

    learnButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        openModal(button);
      });
    });

    closeButtons.forEach(function (button) {
      button.addEventListener("click", closeModal);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && modal && modal.classList.contains("inv-modal-active")) {
        closeModal();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeInvestmentsModule);
  } else {
    initializeInvestmentsModule();
  }
})();
