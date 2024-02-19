import { useWindowSize } from '../../../hooks/useWindowSize';
import styles from "./styles.module.scss";
function PopupModul(props) {

  let { focus, children, } = props;
  //hook
  let size = useWindowSize();
  let { width } = size


  return (
    <div className={styles.popup_module_container} f={width < 990 ? String(focus) : "false"}>
      {children}
    </div>
  )
}

export default PopupModul;

