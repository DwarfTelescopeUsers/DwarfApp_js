import React from "react";

type PropType = {
  component: any;
};
export default function Accordian(prop: PropType) {
  return (
    <div className="accordion mt-4" id="accordionExample">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="false"
            aria-controls="collapseOne"
          >
            Show more
          </button>
        </h2>
        <div
          id="collapseOne"
          className="accordion-collapse collapse"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">{prop.component}</div>
        </div>
      </div>
    </div>
  );
}
