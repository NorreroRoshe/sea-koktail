import cn from 'classnames';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import 'overlayscrollbars/overlayscrollbars.css';
import {observer} from 'mobx-react';

type ScrollbarProps = {
  options?: any;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

const Scrollbar: React.FC<ScrollbarProps> = observer(({
  options,
  children,
  style,
  className,
  ...props
}) => {
  return (
    <OverlayScrollbarsComponent
      options={{
        className: cn('os-theme-thin', className),
        scrollbars: {
          autoHide: false,
        },
        ...options,
      }}
      style={style}
      {...props}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
});

export default Scrollbar;
