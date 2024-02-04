import React, { useState } from "react";

const SideBar = () => {
  return (
    <div>
      <button
        class="btn btn-primary"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasScrolling"
        aria-controls="offcanvasScrolling"
      >
        ☰
      </button>

      <div
        class="offcanvas offcanvas-start"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabindex="-1"
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasScrollingLabel">
            Offcanvas with body scrolling
          </h5>
          <button
            type="button"
            // class="btn-close"
            class="btn btn-primary"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >☰</button>
        </div>
        <div class="offcanvas-body">
          <p>
            Try scrolling the rest of the page to see this option in action.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
