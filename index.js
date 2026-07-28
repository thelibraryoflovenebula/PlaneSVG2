/* ASSIGNMENT 5 DOCUMENTATION HEADER
Name: Neil Patrick Olaires
Course: COMP 10259
Assignment: A4
Date: July 16 2026
*/


/** TABLE OF CONTENTS
 * 
 * 1. Classes
 * 2. Initialized Id's & variables
 * 3. Functions
 * 4. Initialized objects
 * 5. Buttons and interval functions
 */


//-----------------1. Classes------------------//

/** 1. Plane class
 * 
 */
class plane {

    /** PLANE CONSTRUCTOR
     * Created once in window class, plane starts at position 100,150
     * 
     * 
     * @param {the svg group that represents the plane} element 
     */
    constructor(element) {
        this.element = element;
        this.x = 100;
        this.y = 150;
        this.width = 100;
        this.height = 20;

        this.update(); // -> call update function
    }
    /** MOVE TO METHOD 
     * Function used in "MouseMove" add event Listener
     * 
     * 
     * @param {The new X position} x 
     * @param {The new Y position} y 
     * 
     * then call update function
     */
    moveTo(x,y) {
        this.x = x;
        this.y = y;
        this.update(); // -> call the update funciton
    }

    /** UPDATE METHOD
     * Function used in moveTo() method
     * Does the needed transform and translate 
     */
    update() {
        this.element.setAttribute(
            "transform",
            `translate(${this.x}, ${this.y})`
        );
    }

    //GETTERS (Useful for our collision function)
        getX() {
            return this.x;
        }
        getY() {
            return this.y + 20;
        }
        getWidth() {
            return this.width;
        }
        getHeight() {
            return this.height;
        }

}


/** 2. Cloud class
 * this class has only the Cloud object maker
 * 
 */
class cloud {
    /** CLOUD CONSTRUCTOR 
     * creates cloud when new cloud() is called, but takes in
     * two parameters, one for x position and second for y position
     * 
     * @param {x position that the cloud will be generated on} x 
     * @param {y position that the cloud will be generated on} y 
     */
    constructor(x,y) {
       this.cloud = this.cloudObject(x,y);
       this.x = x + 3;
       this.y = y - 2;
       this.width = 60;
       this.height = 25;
    }

    /**getter for cloud object
     * 
     * @returns the object for the specified cloud
     */
    getCloud() {
        return this.cloud;
    }

    /** getter for cloud's x variable
     * 
     * @returns  the x coordinated of a 'grabbed' cloud object
     */

    getX() {
        return this.x;
    }

    /** getter for cloud's y variable
     * 
     * @returns  the y coordinated of a 'grabbed' cloud object
     */
    getY(){
        return this.y;
    }

    /** CLOUD OBJECT 
     * method that actually creates the object, is an assistant method for drawing new cloud
     * uses the setAttribute and createElementNS stuff we learned in class
     * 
     * each should look like this in the html:
     * 
     * <g class="cloudsandshit">
     * <circle cx="newX" cy="newY + 10" r="18" fill="white" />
     * <circle cx="newX + 30" cy="newY + 7" r=26" fill="white" />
     * <circle cx="newX + 60" cy="newY + 10" r="18" fill="white" />
     * <rect x="newX + 3" y="newY - 2" width="50" height="20" fill="none" stroke="black" /> <!-- THIS IS TEMPORARY-->
     * </g>
     * 
     * @param {Randomly generated x position} newX 
     * @param {Randomly generated y position} newY 
     */
    cloudObject(newX, newY) {
        let NS = "http://www.w3.org/2000/svg";

        let changeX = newX;
        let changeY = newY; 

        //this creates a new group
        let cloudnewgroup = document.createElementNS(NS, "g");
            cloudnewgroup.setAttribute("class", "cloudsandshit");

        //left circle cloud
        let cloudnewleft = document.createElementNS(NS, "circle");
            cloudnewleft.setAttribute("cx", newX); 
            cloudnewleft.setAttribute("cy", newY + 10); 
            cloudnewleft.setAttribute("r", "18");//fixed 
            cloudnewleft.setAttribute("fill", "white"); //fixed 
            cloudnewgroup.appendChild(cloudnewleft);

        //middle circle cloud
        let cloudnewmiddle = document.createElementNS(NS, "circle");
            cloudnewmiddle.setAttribute("cx", newX + 30); 
            cloudnewmiddle.setAttribute("cy", newY  + 7); 
            cloudnewmiddle.setAttribute("r", "26"); //fixed 
            cloudnewmiddle.setAttribute("fill", "white"); //fixed 
            cloudnewgroup.appendChild(cloudnewmiddle); 

        //right circle cloud
        let cloudnewright = document.createElementNS(NS, "circle");
            cloudnewright.setAttribute("cx", newX + 60 ); 
            cloudnewright.setAttribute("cy", newY + 10); 
            cloudnewright.setAttribute("r", "18");//fixed 
            cloudnewright.setAttribute("fill", "white"); //fixed 
            cloudnewgroup.appendChild(cloudnewright);

        /*hit box for cloud -> TEMPORARY TO SEE THE HITBOXES

            let cloudnewhitbox = document.createElementNS(NS, "rect");
                cloudnewhitbox.setAttribute("x", newX + 3);
                cloudnewhitbox.setAttribute("y", newY - 2);
                cloudnewhitbox.setAttribute("width", 50);
                cloudnewhitbox.setAttribute("height", 20); 
                cloudnewhitbox.setAttribute("fill", "none");  
                cloudnewhitbox.setAttribute("stroke", "black");     
                cloudnewgroup.appendChild(cloudnewhitbox); //
        */

            cloudCanvas.appendChild(cloudnewgroup);

            return cloudnewgroup;
    }



}


/** 3 Clouds 
 *  this class houses the array list of clouds
 * 
 */

class clouds {

    /** CLOUDS CONSTRUCTOR
     *  initializes an array of object clouds,
     *  is created on constructor,
     * 
     *  starts off with index 0, but is added and deleted on with these methods
     *  skyStart()
     *  createCloud()
     *  removeCloud()
     *  deleteAllClouds()
     */
    constructor() {
        this.cloudList = []; //cloud list array
    }
           
    /** CREATE CLOUD METHOD
     * this method creates randomly generated clouds
     * 
     * @param {how many clouds you want to make in (or outside) the Window Class} howMany 
     */
    createCloud(howMany) {
        for(let i = 0; i < howMany ;i++) {
            let cloudX = Math.floor(Math.random() * 1000);//generate x position (0-400)
            let cloudY = Math.floor(Math.random()* 400);//generate y position (0-1000)
            let newCloud = new cloud(cloudX, cloudY);

            this.cloudList.push(newCloud); //add cloud object into the cloudList array
        }
    }
    /**GETER FOR CLOUD LIST
     * 
     * @returns  the cloud list
     */
    getCloudList () {
        return this.cloudList;
    }

    /** REMOVE CLOUD FUNCTION
     * 
     * @param {*} index 
     */
    removeCloud(index) {
        this.cloudList[index].remove();
    }



    /** CLOUDS RESET FUNCTION
     * 
     * used in reset clouds button
     * 
     */
    deleteAllClouds() {
        cloudCanvas.replaceChildren();
        this.cloudList.length = 0;
    }



}






/** 4. Sky Window class 
 * 
 * is referenced as "newGame" object in main method
 */
class skyWindow {
    /** SKY WINDOW CONSTRUCTOR
     * initializes state variables timeSwitch and cloudPOints
     * association with clouds and plane objects to call upon their functions
     * calls for clouds array named cloudList to manipulate index 
     * 
     */
    constructor() {
        this.timeSwitch = 0;
        this.cloudPoints = 0;
        this.clouds = new clouds(); //everytime constructor is called, make a new clouds and insert it
        this.plane = new plane(document.getElementById("plane")) //gets group of plane (img, hitbox)
        
        this.collided = false; //starts at not collided
        this.cloudList = this.clouds.cloudList; //initialize the cloudlist for window class

    }

    /** GAMESTART FUNCTION 
     * adds cloud
     * 
     * @param {the amount of clouds you want to start the program with} startingCloud 
     */
    skyStart(startingClouds) {
        this.clouds.createCloud(startingClouds);
    }

    /** ADD CLOUDS FUNCTION
     * 
     * used in "Add Cloud" function/addEventListener
     * creates 3 clouds upon every click
     * 
     * @param {the amount of clouds you want to make} x
     */
    skyCloudAdd(x) {
        this.clouds.createCloud(x);
    }

    /**HELPER FUNCTION FOR checkCollisionAll() method
     * 
     * is a comparative function that compares the position 
     * of the plane object and ONE cloud object (specified in the parameter)
     * 
     * I honestly researched a lot on collision detection and this was what i came out with
     * also that one class example really helped me
     * 
     * @param {The ONEcloud object you will be comparing positions with} cloudObject 
     * @returns {state of if its collided} true, false
     */
    checkCollisionOne(cloudObject) {
        /** POINTS EXPLAINED
         * 
         * pointA = cloud left
         * pointB = cloud right
         * pointC = plane left 
         * pointD = plane right
         * 
         * pointE = cloud top
         * pointF = cloud bottom
         * pointG = plane top
         * pointH = plane bottom
         * 
         * i used letters A-F because i had to visualize the math
         * in shape format and i had named them points a,b,c etc...
         * 
         * 
         */
        let planebruh = this.plane; 

        let pointA = cloudObject.x;
        let pointB = pointA + cloudObject.width;
        let pointC = planebruh.getX();
        let pointD = pointC + planebruh.getWidth();

        let pointE = cloudObject.y;
        let pointF = pointE + cloudObject.height;
        let pointG = planebruh.getY();
        let pointH = pointG + planebruh.getHeight();
        
        if ( //IS COLLIDED WITH OUR PLANE

            pointC < pointB &&  // plane left < cloud right
            pointD > pointA &&  // plane right > cloud left
            pointG < pointF &&  // plane top < cloud bottom
            pointH > pointE     // plane bottom > cloud top
        ) 
        /* if */{//RETURN BOOLEAN "True" IF IT IS COLLIDED
            return true;
        }
        else {//RETURN BOOLEAN "True" IF IT IS COLLIDED
            return false;
        }
    }

    /** MAIN COLLISION DETECTION FUNCTION
     * aided by the checkCollisionOne function,
     * uses a for loop to call checkCollisionOne for all of the objects in the array
     * 
     * 
     */
    checkCollisionAll() {
        let changeText =  document.getElementById("change");

        for(let i = 0; i < this.cloudList.length; i++) { //go through all the of the current cloudList array
            if (this.checkCollisionOne(this.cloudList[i])) {
                this.cloudList[i].getCloud().remove();
                this.cloudList.splice(i,1);
                this.collided = true;
                this.cloudPoints++;

                break;
            } else {
                this.collided = false;
            }


            if (this.collided) {
                changeText.className = "collided";  
            }
            else {
                changeText.className = "not";
            }



        }

        if (this.cloudList.length == 0) {
            this.clouds.createCloud(100);
        }
        this.checkSuperMode();
        
    }


    /** RESETS THE SKY
     * 
     * delete all clouds in the array,
     * then add as much
     * 
     */
    resetSky() {
       this.clouds.deleteAllClouds(); 
       this.clouds.createCloud(100);
    }


    /**SHOW POINT FUNCTION
     * 
     * updates the displayed cloud score  and is used in a setInterval function for ever 50 ms
     * changes text
     */
    showPoints() {
        let cloudText = document.getElementById("cloudCount");
        cloudText.innerHTML = "<b>" + this.cloudPoints + "</b>";
    }

    /**ABILITY TO CHANGE BACKGROUND WHEN DOUBLE CLICKED
     * 
     * 
     */
    coolAbility() {
        this.timeSwitch++;

        if ((this.timeSwitch % 3) == 0) { //normal time
            wholeWindow.setAttribute("class", "afternoonState");
        }
        else if ((this.timeSwitch % 3) == 1) {
            wholeWindow.setAttribute("class", "eveningState");
        }
        else if ((this.timeSwitch % 3) == 2) {
            wholeWindow.setAttribute("class", "nightState");
        }

        
    }

    /** CHECK SUPER MODE FUNCTION
     *  this function checks if the superMode is able to be made
     *  super mode activates every 500 points (modulo), and lasts 2 seconds
     * 
     * i need to also restart it back so its not in super mode and i made 
     * it so that when it goes 100 points after super mode it switches back the class
     * to normal 
     *
     * IS USED IN CHECKCOLLISION so that it checks as fast as it checks with collision 
     *      ->which is 1 ms 
     * 
     */
    checkSuperMode() {

        if (((this.cloudPoints % 500) == 100) && (this.cloudPoints > 0)) {
            document.body.setAttribute("class", "update");
        }

        if (((this.cloudPoints % 500) == 0) && (this.cloudPoints > 0)) {
            document.body.setAttribute("class", "superMode");
        }

    }

    
    
    

}






//-----------------2. ID's and Variables------------------//

let addClick = document.getElementById("addClick");
let resetClick = document.getElementById("resetClick");

let planeHitBox = document.getElementById("planeHitBox");
let cloudCanvas = document.getElementById("cloudCanvas");
let wholeWindow = document.getElementById("skyWindow");
let newGame = new skyWindow(); //make a new game by creating a new window object




//-----------------3. Functions------------------//

/** MOUSE MOVEMENT FUNCTION
 * 
 * this is the main function that allows for the plane movement using the mouse
 * is tracked within the SVG widnow
 * 
 */
wholeWindow.addEventListener( "mousemove", function(event){
    const point = wholeWindow.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    const svgPoint = point.matrixTransform(wholeWindow.getScreenCTM().inverse());

    newGame.plane.moveTo(svgPoint.x - 40, svgPoint.y - 10); 
}
);

function addCloudsHTML(){
    newGame.skyCloudAdd(30);
}

function changeSkyHTML() {
    newGame.coolAbility();
}




//-----------------4. Main method ------------------//

newGame.skyStart(50); //start the game with 10 clouds




//-----------------5. Interval & Button functions------------------//

addClick.addEventListener("click", () => {      newGame.skyCloudAdd(200);  });
resetClick.addEventListener("click", () => {    newGame.resetSky();     });
setInterval( () => {newGame.checkCollisionAll(); } , 1); //for every 50 milliseconds, check if the plane is colided
setInterval( () => {newGame.showPoints();} , 50); //check cloud points to update
setInterval( () => {newGame.checkSuperMode}, 50);





