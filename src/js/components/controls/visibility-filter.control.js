import React from 'react'
import PropTypes from 'prop-types'

const VisibilityFilterControl = ({ active, children, onClick }) => (
    <button
       onClick={onSetFilter}
       disabled={active}
       style={{
           marginLeft: '4px',
       }}
    >
      {children}
    </button>
)

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onSetFilter: PropTypes.func.isRequired,
  onResetFilter: PropTypes.func.isRequired
}

export default VisibilityFilterControl;