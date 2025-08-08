import css from './Sidebar.module.css';
import { AiFillCalendar, AiOutlineFontSize } from 'react-icons/ai';
import { MdSpaceDashboard } from 'react-icons/md';
import { FaTasks } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className={css.container}>

        <img src="./logo.png" alt="logo"  className={css.logo}/>


        <div className={css.menu}>
            <NavLink to="dashboard" className={css.item} title={"Dashboard"}>

                <MdSpaceDashboard size={30} />

            </NavLink>

            <NavLink to="calendar" 
            className={css.item} 
            title="Calendar"
            >
                <AiFillCalendar size={30} />
            </NavLink>

            <NavLink to="board" 
            className={css.item} 
            title="Trello Board"
            >
                <FaTasks size={30} />
            </NavLink>

            <NavLink to="users" 
            className={css.item} 
            title="Users"
            >
                <AiOutlineFontSize size={30} />
            </NavLink>
        </div>
    </div>
  )
}

export default SideBar;