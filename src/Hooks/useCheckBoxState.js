import React from 'react';

export const useCheckboxState = (initialCheck = false) => {
    const [checked, setChecked] = React.useState(initialCheck);
    return { checked, onChange: setChecked };
};