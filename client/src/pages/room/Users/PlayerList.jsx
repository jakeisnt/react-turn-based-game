import PropTypes from "prop-types";
import User from "./User";
import { Box } from "../../../components";

function PlayerList({ users, capacity, myId, userIsMod }) {
  return users && users.length > 0 ? (
    <>
      <div>
        Players
        {capacity &&
          `: ${users && users.length}/${capacity >= 0 ? capacity : "∞"}`}
      </div>
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
                  userIsSpectator
                  playerList
                />
              )
          )}
      </Box>
    </>
  ) : null;
}

PlayerList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  capacity: PropTypes.number,
  myId: PropTypes.string.isRequired,
  userIsMod: PropTypes.bool.isRequired,
};

PlayerList.defaultProps = {
  capacity: null,
};

export default PlayerList;
