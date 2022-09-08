import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const RealEstateContext = createContext();

export const RealEstateProvider = ({ children }) => {
  // Here we create state - and with useEffect pull it from json server db.json file
  const [users, setUsers] = useState([]);

  // Load users
  useEffect(() => {
    fetchUsers();
  }, [users]);

  // Get all adds when users is fetcher - users will change from emty array to full array
  useEffect(() => {
    getAllAdds();
  }, [users]);

  //fetch users
  const fetchUsers = async () => {
    const response = await fetch(`http://localhost:5000/users`);
    const data = await response.json();
    setUsers(data);
  };

  // getAllAdds
  const getAllAdds = () => {
    let all = [];
    users.forEach((user) => {
      user.adds &&
        user.adds.forEach((add) => {
          all.push(add);
        });
    });
    setAllAdds(all);
  };

  // State for showLogInForm
  const [showLogInForm, setShowLogInForm] = useState(false);

  // State for active user
  const [activeUserInfo, setActiveUserInfo] = useState(null);

  //State for open new Add form
  const [showNewAddForm, setShowNewAddForm] = useState(false);

  // State for success message
  const [successDiv, setSuccessDiv] = useState({
    active: true,
    message: "",
    class: "hidden",
  });

  // rating state
  const [rating, setRating] = useState({
    totalRatings: 1, // num of responses
    sumOfRatings: 5, // sum for each response / total
  });

  // Set success div function - to display success div element with corresponding message
  const setSuccessDivFunction = (message) => {
    setSuccessDiv({
      active: true,
      message: message,
      class:
        "bg-green-500 text-white text-xl p-4 rounded-lg absolute top-5 right-8 block z-10 succesDivAnimation",
    });
    hideSuccessDiv();
  };

  //hide success message - function
  const hideSuccessDiv = () => {
    setTimeout(() => {
      setSuccessDiv({
        active: false,
        message: "",
        class: "hidden",
      });
    }, 3000);
  };

  // setActiveUser
  const setActiveUser = (user) => {
    setActiveUserInfo(user);
    setSuccessDivFunction(`Welcome back, ${user.name}!`);
  };

  // createNewUser
  const createNewUser = async (registerInputs) => {
    // Create new user based on userInputs(mail,name,password,phone,lastname) and it's favorites prop, id will be added automatically via json server
    const newUser = registerInputs;
    newUser.favorites = [];
    newUser.adds = [];

    const response = await fetch("http://localhost:5000/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    const data = await response.json();

    // Set users state with that new user
    setUsers([...users, data]);
    // Then set that user as active user
    setActiveUser(data);
    showLogIn();
    // Message that new user profile is created
    setSuccessDivFunction("New profile created successfully!");
  };

  // Log out function
  const logOut = () => {
    setActiveUserInfo(null);
  };

  // show log in
  const showLogIn = () => {
    setShowLogInForm(!showLogInForm);
  };

  //openNewAddForm
  const openNewAddForm = () => {
    setShowNewAddForm(true);
  };

  //closeNewAddForm
  const closeNewAddForm = () => {
    setShowNewAddForm(false);
  };

  //appendNewAddToActiveUser
  const appendNewAddToActiveUser = async (newAdd) => {
    // Get to the new add some new params
    newAdd.releaseTime = new Date().toString().slice(0, 15);
    newAdd.releaseTimeStamp = new Date().getTime();
    newAdd.addID = uuidv4();
    // Get current user
    const currentUser = activeUserInfo;
    currentUser.adds.push(newAdd);

    const response = await fetch(
      `http://localhost:5000/users/${activeUserInfo.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentUser),
      }
    );

    const data = await response.json();

    // Append that add to adds array of active user
    setUsers(
      users.map((user) => {
        if (user.id === activeUserInfo.id) {
          user = data;
        }
        return user;
      })
    );
    closeNewAddForm();
    // Display message for successfully created add
    setSuccessDivFunction("Add created successfully!");
  };

  // All adds ---- Mozda pogledati jos malo moze li se uprostiti
  const [displayedAdds, setDisplayedAdds] = useState([]);
  const [allAdds, setAllAdds] = useState([]);

  useEffect(() => {
    let all = [];
    users.forEach((user) => {
      user.adds &&
        user.adds.forEach((add) => {
          all.push(add);
        });
    });
    setAllAdds(all);
  }, [displayedAdds]);

  // SortFromContext function - form offers.js
  const sortFromContext = (e) => {
    let sortType = e.target.value;
    setDisplayedAdds(
      allAdds.sort((a, b) => {
        if (sortType === "Oldest-Newest") {
          return a.releaseTimeStamp - b.releaseTimeStamp;
        }
        if (sortType === "Newest-Oldest") {
          return b.releaseTimeStamp - a.releaseTimeStamp;
        }
        if (sortType === "PriceMin-Max") {
          return a.price - b.price;
        }
        if (sortType === "PriceMax-Min") {
          return b.price - a.price;
        }
      })
    );
  };

  // addToFavorite ---------------------------------------------------------------------------------------------------------------
  const addToFavorite = (favoriteId) => {
    // If someone is logged in, otherwise this can't be clicked
    if (activeUserInfo) {
      // Check to see if selected add is alredy in favorite, if yes remove it if no add it to favorite
      setUsers(
        users.map((user) => {
          if (user.id === activeUserInfo.id) {
            // Check to see if favorite id is alredy there
            if (!user.favorites.includes(favoriteId)) {
              user.favorites.push(favoriteId);
              setSuccessDivFunction("Added to your favorite list.");
            } else {
              user.favorites = user.favorites.filter((favoriteAddId) => {
                return favoriteAddId !== favoriteId;
              });
              setSuccessDivFunction("Removed from your favorite list.");
            }
            return user;
          } else {
            return user;
          }
        })
      );
    } else {
      setSuccessDivFunction("You must be logged in!");
    }
  };

  // saveNewProfileInfo - SAD ODJE OSTALO DA SE OVA SLIKA PRETVORI U STRING I ONDA DA SE UBACA U SRC
  const saveNewProfileInfo = async (newInfo, userImageUrl) => {
    let updUser;
    users.forEach((user) => {
      if (user.id === newInfo.id) {
        user.name = newInfo.name;
        user.lastName = newInfo.lastName;
        user.phone = newInfo.phone;
        user.userImageUrl = userImageUrl;
      }
      updUser = user;
    });

    const response = await fetch(`http://localhost:5000/users/${newInfo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updUser),
    });

    const data = await response.json();

    setActiveUser(data);

    setUsers(
      users.map((user) => {
        if (user.id === newInfo.id) {
          user = data;
        }
        return user;
      })
    );

    setSuccessDivFunction("Info successfully updated!!");
  };

  // Function for sorting based on clicked filter from left side in offers.js
  const quickFilterFunction = (e, quickFilterInfo) => {
    // Make initial array
    let initArray = allAdds;

    // Make array to permut during filter
    let arrayToPermut = [];

    // If there is no adds
    if (initArray.length === 0) {
      setSuccessDivFunction("No adds found!");
    }

    // Always first permut by price
    arrayToPermut = allAdds.filter((add) => {
      return (
        parseInt(add.price) >= parseInt(quickFilterInfo.priceMin) &&
        parseInt(add.price) <= parseInt(quickFilterInfo.priceMax)
      );
    });

    if (quickFilterInfo.propertyStatus) {
      arrayToPermut = allAdds.filter((add) => {
        return add.addType === quickFilterInfo.propertyStatus;
      });
    }

    if (quickFilterInfo.propertyCategory) {
      arrayToPermut = arrayToPermut.filter((add) => {
        return add.propertyType === quickFilterInfo.propertyCategory;
      });
    }

    if (arrayToPermut.length === 0) {
      setSuccessDivFunction("No adds for that filters.");
      return;
    }

    setDisplayedAdds(arrayToPermut);
  };

  //submitRating
  const submitRating = (id) => {
    setRating({
      totalRatings: rating.totalRatings + 1,
      sumOfRatings: rating.sumOfRatings + parseInt(id),
    });

    setSuccessDivFunction("Thank you for letting us know.");
  };

  // deleteAdd function ---------- WHEN CLICK ON QUICK FILTER AGAIN SHOW OUR ALL ADDS, maybe add json server??
  const deleteAdd = (id) => {
    setUsers(
      users.map((user) => {
        user.adds.forEach((add) => {
          if (add.addID === id) {
            user.adds = user.adds.filter((add) => add.addID !== id);
          }
        });
        return user;
      })
    );
  };

  return (
    <RealEstateContext.Provider
      value={{
        users,
        activeUserInfo,
        showLogInForm,
        showNewAddForm,
        successDiv,
        displayedAdds,
        allAdds,
        rating,
        showLogIn,
        createNewUser,
        setActiveUser,
        logOut,
        openNewAddForm,
        closeNewAddForm,
        appendNewAddToActiveUser,
        sortFromContext,
        addToFavorite,
        saveNewProfileInfo,
        quickFilterFunction,
        submitRating,
        deleteAdd,
      }}
    >
      {children}
    </RealEstateContext.Provider>
  );
};

export default RealEstateContext;
