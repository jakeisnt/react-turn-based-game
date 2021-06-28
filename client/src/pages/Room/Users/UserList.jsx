import PropTypes from "prop-types";
import User from "./User";
import { Box } from "../../../components";

/** A list of users in the game. */

function UserList({ users, title, capacity, myId, userIsMod }) {
  return users && users.length > 0 ? (
    <>
      {title}
      {capacity &&
        `: ${users && users.length}/${capacity >= 0 ? capacity : "∞"}`}
      <Box>
        {users &&
          users.map(
            (user) =>
              user && (
                <User
                  key={user.id}
                  name={user.name}
                  userId={user.id}
                  myId={myId}
                  userIsMod={userIsMod}
                  inactiveUser
                />
              )
          )}
      </Box>
    </>
  ) : null;
}

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
  capacity: PropTypes.number,
  myId: PropTypes.string.isRequired,
  userIsMod: PropTypes.bool.isRequired,
};

UserList.defaultProps = {
  capacity: null,
};

export default UserList;
