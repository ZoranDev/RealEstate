import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

// Importing images for start app - OVO MOZDA DRUGACIJE NEKAKO VIDJETI
import Add1Img1 from "../Images/Start/Condo1.jpg";
import Add1Img2 from "../Images/Start/Condo1Interior.jpg";
import Add2Img1 from "../Images/Start/House1.jpg";
import Add2Img2 from "../Images/Start/House2.jpg";
import Add2Img3 from "../Images/Start/House3.jpg";

const RealEstateContext = createContext();

export const RealEstateProvider = ({ children }) => {
  // Here we create state - to kasnije trebaju biti konstante a za sad samo admina i jos jednog usera
  const [users, setUsers] = useState([
    {
      name: "admin",
      lastName: "admin",
      phone: "111 222 333",
      userImageUrl: null,
      email: "admin@admin.com",
      password: "admin",
      id: uuidv4(),
      favorites: [],
      adds: [],
    },
    {
      name: "Zoran",
      lastName: "Pavicevic",
      phone: "068888380",
      userImageUrl: null,
      email: "zoran@gmail.com",
      password: "z",
      id: uuidv4(),
      favorites: [],
      adds: [
        {
          addType: "Rent",
          propertyType: "Condo",
          description:
            "For sale condo 50 m2 in a quiet part of the capital. The apartment is furnished and has one room.",
          country: "Montenegro",
          city: "Podgorica",
          price: 500,
          square: 50,
          images: [Add1Img1, Add1Img2],
          releaseTime: "Tue May 31 2022",
          releaseTimeStamp: 1653988980000,
          addID: uuidv4(),
          additionalInfo: {
            address: "Dalmatinska br 65",
            numOfRooms: 1,
            numOfBathrooms: 1,
            numOfTerraces: 1,
            parking: "Yes",
            airCondition: "Yes",
            floor: 3,
          },
        },
        {
          addType: "Sell",
          propertyType: "House",
          description:
            "For sale house 150 m2 on periphery of the capital. The house is furnished and has five room.",
          country: "Montenegro",
          city: "Podgorica",
          price: 150000,
          square: 150,
          images: [Add2Img2, Add2Img1, Add2Img3],
          releaseTime: "Tue May 25 2022",
          releaseTimeStamp: 1653470580000,
          addID: uuidv4(),
          additionalInfo: {
            address: "Konik bb",
            numOfRooms: 5,
            numOfBathrooms: 2,
            numOfTerraces: 3,
            parking: "Yes",
            airCondition: "Yes",
            floor: 1,
          },
        },
      ],
    },
  ]);

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
  const createNewUser = (registerInputs) => {
    // Create new user based on userInputs(mail,name,password,phone,lastname) and it's id and favorites prop
    const newUser = registerInputs;
    newUser.id = uuidv4();
    newUser.favorites = [];
    newUser.adds = [];
    // Set users state with that new user
    setUsers([...users, newUser]);
    // Then set that user as active user
    setActiveUser(newUser);
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
  const appendNewAddToActiveUser = (newAdd) => {
    newAdd.releaseTime = new Date().toString().slice(0, 15);
    newAdd.releaseTimeStamp = new Date().getTime();
    newAdd.addID = uuidv4();
    // Append that add to adds array of active user
    setUsers(
      users.map((user) => {
        if (user.id === activeUserInfo.id) {
          user.adds.push(newAdd);
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

  // saveNewProfileInfo ----------------------------------------------------------------------------------------------------
  const saveNewProfileInfo = (e, newInfo, userImageUrl) => {
    // Now go through users and for that user change info
    setUsers(
      users.map((user) => {
        if (user.id === newInfo.id) {
          user.name = newInfo.name;
          user.lastName = newInfo.lastName;
          user.phone = newInfo.phone;
          user.userImageUrl = userImageUrl;
          return user;
        } else {
          return user;
        }
      })
    );
    setSuccessDivFunction("Info successfully updated!!");
  };

  const quickFilterFunction = (e, quickFilterInfo) => {
    // Make initial array
    let initArray = [];
    users.forEach((user) => {
      if (user.adds) {
        user.adds.forEach((add) => {
          initArray.push(add);
        });
      }
    });

    // Make array to permut during filter\

    let arrayToPermut = [];

    // If there is no adds
    if (initArray.length === 0) {
      setSuccessDivFunction("No adds found!");
    }

    // Check to see if wee need to filter at all
    if (
      !quickFilterInfo.propertyCategory &&
      !quickFilterInfo.propertyStatus &&
      quickFilterInfo.priceMin === 1 &&
      quickFilterInfo.priceMax === 500000
    ) {
      setDisplayedAdds(initArray);
    } else {
      // If something of default parameters changed
      // First filter by price
      arrayToPermut = allAdds.filter((add) => {
        return (
          parseInt(add.price) >= parseInt(quickFilterInfo.priceMin) &&
          parseInt(add.price) <= parseInt(quickFilterInfo.priceMax)
        );
      });

      // If there is no adds in that price range
      if (arrayToPermut.length === 0) {
        setSuccessDivFunction("No adds in that price range.");
      } else {
        if (quickFilterInfo.propertyStatus) {
          // If we have property status then we check if we have property category,
          // If only have propery status fiter that way other first filter by status then by category, same is next else if
          if (quickFilterInfo.propertyCategory) {
            arrayToPermut = allAdds.filter((add) => {
              return add.addType === quickFilterInfo.propertyStatus;
            });

            arrayToPermut = arrayToPermut.filter((add) => {
              return add.propertyType === quickFilterInfo.propertyCategory;
            });

            if (arrayToPermut.length === 0) {
              setSuccessDivFunction("No add founded.");
            } else {
              setDisplayedAdds(arrayToPermut);
            }
          } else {
            arrayToPermut = allAdds.filter((add) => {
              return add.addType === quickFilterInfo.propertyStatus;
            });

            if (arrayToPermut.length === 0) {
              setSuccessDivFunction("No add founded.");
            } else {
              setDisplayedAdds(arrayToPermut);
            }
          }
        } else if (quickFilterInfo.propertyCategory) {
          if (quickFilterInfo.propertyStatus) {
            arrayToPermut = allAdds.filter((add) => {
              return add.propertyType === quickFilterInfo.propertyCategory;
            });

            arrayToPermut = arrayToPermut.filter((add) => {
              return add.addType === quickFilterInfo.propertyStatus;
            });

            if (arrayToPermut.length === 0) {
              setSuccessDivFunction("No add founded.");
            } else {
              setDisplayedAdds(arrayToPermut);
            }
          } else {
            arrayToPermut = allAdds.filter((add) => {
              return add.propertyType === quickFilterInfo.propertyCategory;
            });

            if (arrayToPermut.length === 0) {
              setSuccessDivFunction("No add founded.");
            } else {
              setDisplayedAdds(arrayToPermut);
            }
          }
        } else {
          // If ther is no filter by status or category only have filter by price
          setDisplayedAdds(arrayToPermut);
        }
      }
    }
  };

  //submitRating
  const submitRating = (id) => {
    let clickedRating = parseInt(id);

    setRating({
      totalRatings: rating.totalRatings + 1,
      sumOfRatings: rating.sumOfRatings + clickedRating,
    });

    setSuccessDivFunction("Thank you for letting us know.");
  };

  // deleteAdd -----------------------------------------------------------------------------------------------------------------
  const deleteAdd = (e, id) => {
    setUsers(
      users.map((user) => {
        if (user.adds) {
          user.adds.forEach((add) => {
            if (add.addID === id) {
              user.adds = user.adds.filter((add) => {
                return add.addID !== id;
              });
            }
          });

          return user;
        } else {
          return user;
        }
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
