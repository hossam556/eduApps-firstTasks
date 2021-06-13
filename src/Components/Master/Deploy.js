import React from 'react'

function Deploy(WrappedComponent) {
    return (props, railsContext) => {
      const { location } = railsContext;
      const locale = railsContext.i18nLocale;
      return () => {
        return (
          <WrappedComponent
              {...props}
              location={location}
              locale={locale}/>
        );
      }
    }
  }

export default Deploy;