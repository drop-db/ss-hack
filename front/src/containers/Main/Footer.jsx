import React, {useContext} from 'react';

import styles from './Footer.scss';

const Footer = props => {
   return (
       <div className={styles.footer}>
          <div>
             <div className={styles.label}>Солнечный</div>
             <div className={styles.links}>
                <div>terms</div>
                <div>privacy</div>
                <div>contact</div>
             </div>
          </div>
          <div className={styles.footerSocials}>
             <img alt="inst"/>
             <img alt="vk"/>
             <img alt="fc"/>
          </div>
       </div>
   );
};

export default Footer;
