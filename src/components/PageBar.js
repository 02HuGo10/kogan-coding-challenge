import React from "react";

const PageBar = props => {
  const previousButtonDisabled = props.index === 0;
  const nextButtonDisabled = !props.next;

  return (
    <nav className="page-nav-bar">
      <ul className="pagination">
        <li className="page-item">
          <button
            className={
              previousButtonDisabled
                ? "btn btn-secondary btn-lg disabled"
                : "btn btn-secondary btn-lg"
            }
            disabled={previousButtonDisabled}
            onClick={() => props.onPrevious()}
          >
            Previous
          </button>
        </li>
        <li className="page-item">
          <button
            className={
              nextButtonDisabled
                ? "btn btn-secondary btn-lg disabled"
                : "btn btn-secondary btn-lg"
            }
            disabled={nextButtonDisabled}
            onClick={() => props.onNext()}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default PageBar;
