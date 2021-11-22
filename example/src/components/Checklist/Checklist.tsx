import React from 'react';

import Checkmark from './Checkmark';
import Xmark from './Xmark';

const Checklist = ({
  children,
  completed,
  show,
}: {
  children: React.ReactNode;
  completed: boolean;
  show: boolean;
}) => (
  <div
    className="row"
    style={{ marginBottom: '80px', display: show ? '' : 'none' }}
  >
    <div className="col-1">{completed ? <Checkmark /> : <Xmark />}</div>
    <div className="col-11 flex-column">{children}</div>
  </div>
);

export default Checklist;
