import styles from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";

import { SIDEBAR_MENU } from "./sidebar.config";

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <aside className={styles.sidebar}>

      {/* LOGO */}
      <div className={styles.logo}>
        ArabianCafe
      </div>

      <nav>

        {SIDEBAR_MENU.map((item) => {

          const Icon = item.icon;

          return (
            <div key={item.id}>

              {/* SIMPLE MENU */}
              {!item.children ? (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive ? styles.activeItem : styles.item
                  }
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </NavLink>
              ) : (
                <>
                  {/* GROUP HEADER */}
                  <button
                    className={styles.group}
                    onClick={() =>
                      setOpenMenu(
                        openMenu === item.id ? null : item.id
                      )
                    }
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>

                  {/* CHILD MENU */}
                  {openMenu === item.id && (
                    <div className={styles.children}>
                      {item.children.map((child) => (
                        <NavLink
                          key={child.path}
                          to={child.path}
                          className={({ isActive }) =>
                            isActive ? styles.activeChild : styles.child
                          }
                        >
                          {child.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </>
              )}

            </div>
          );
        })}

      </nav>

    </aside>
  );
}