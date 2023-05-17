import React from "react";

type PropType = {
  children?: React.ReactNode;
  text?: string;
};
export default function Accordian(props: PropType) {
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
            {props.text}
          </button>
        </h2>
        <div
          id="collapseOne"
          className="accordion-collapse collapse px-2 py-3"
          data-bs-parent="#accordionExample"
        >
          {props.children}
        </div>
      </div>
    </div>
  );
}
