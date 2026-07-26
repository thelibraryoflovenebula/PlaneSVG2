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
 * 
 *  
 */
class plane {

    /** PLANE CONSTRUCTOR
     * Created once in window class, plane starts at position 100,150
     * 
     * 
     * @param {i dont know yet, please update this} element 
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
 * 
 */
class cloud {
    constructor() {
       this.cloudList = [];
    }

    /** CREATE CLOUD METHOD
     * this method creates randomly generated clouds
     * 
     * @param {how many clouds you want to make in (or outside) the Window Class} howMany 
     */
    createCloud(howMany) {
        for(let i = 0; i < howMany ;i++ ) {
            let cloudX = Math.floor(Math.random() * 1000);//generate x position (0-400)
            let cloudY = Math.floor(Math.random()* 400);//generate y position (0-1000)
            let newCloud = this.cloudObject(cloudX, cloudY); //call cloudObject function

            this.cloudList.push(newCloud); //add cloud object into the cloudList array
        }
    }

    /** CLOUD OBJECT 
     * method that actually creates the object, is an assistant method for drawing new cloud
     * uses the setAttribute and createElementNS stuff we learned in class
     * 
     * each should look like this in the html:
     * 
     * <g class="clouds and shit">
     * <circle cx="newX" cy="newY + 10" r="18" fill="white" />
     * <circle cx="newX + 30" cy="newY + 7" r=26" fill="white" />
     * <circle cx="newX + 60" cy="newY + 10" r="18" fill="white" />
     * <rect x="newX + 3" y="newY - 2" width="50" height="20" fill="none" stroke="black" />
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

        //hit box for cloud
        let cloudnewhitbox = document.createElementNS(NS, "rect");
            cloudnewhitbox.setAttribute("x", newX + 3);
            cloudnewhitbox.setAttribute("y", newY - 2);
            cloudnewhitbox.setAttribute("width", 50);
            cloudnewhitbox.setAttribute("height", 20); 
            cloudnewhitbox.setAttribute("fill", "none");  
            cloudnewhitbox.setAttribute("stroke", "black");     
            cloudnewgroup.appendChild(cloudnewhitbox); //


            cloudCanvas.appendChild(cloudnewgroup);

            return {
                x: newX + 3,
                y: newY - 2,
                width: 60,
                height: 25
            };

    }



}


/** 3 Clouds 
 *  has array list of clouds
 * 
 */

class clouds {




}

/** 4. Sky Window class 
 * 
 */
class skyWindow {
    constructor() {
        this.collided = false; //starts at not collided
        this.clouds = new cloud(); //everytime constructor is called, make a new cloud and insert it
        this.cloudList = this.clouds.cloudList; //initialize the cloudlist for window class
        this.plane = new plane(document.getElementById("plane")) //gets group of plane (img, hitbox)
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
     */
    skyCloudAdd() {
        this.clouds.createCloud(10);
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
        let storedIndex = 0; // ????? idk what this does

        for(let i = 0; i < this.cloudList.length; i++) { //go through all the of the current cloudList array
            if (this.checkCollisionOne(this.cloudList[i])) {
                storedIndex = i; // still dont know what this does??
                this.collided = true;
            }
        }

        let changeText =  document.getElementById("change");
        
        if(collided) {
            changeText.className = "collided";
            this.cloudList[storedIndex].element.remove();
            this.cloudList.splice(storedIndex,1);
        }
        else {
            changeText.className = "not";
        }
        

    }
    
    /** CLOUDS RESET FUNCTION
     * 
     * used in reset clouds button
     * 
     */
    resetSky() {
        cloudCanvas.replaceChildren();
        this.cloudList.length = 0;
        this.clouds.createCloud(30);
    }

}






//-----------------2. ID's and Variables------------------//

let addClick = document.getElementById("addClick");
let resetClick = document.getElementById("resetClick");
let cloudPoints = 0;

let planeHitBox = document.getElementById("planeHitBox");
let cloudCanvas = document.getElementById("cloudCanvas");
let wholeWindow = document.getElementById("skyWindow");
let newGame = new skyWindow(); //make a new game by creating a new window object




//-----------------3. Functions------------------//

wholeWindow.addEventListener( "mousemove", function(event){
    const point = wholeWindow.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    const svgPoint = point.matrixTransform(wholeWindow.getScreenCTM().inverse());

    newGame.plane.moveTo(svgPoint.x - 40, svgPoint.y - 10)
}
);




//-----------------4. Main method ------------------//

newGame.skyStart(50); //start the game with 10 clouds




//-----------------5. Interval & Button functions------------------//

addClick.addEventListener("click", () => {      newGame.skyCloudAdd();  });
resetClick.addEventListener("click", () => {    newGame.resetSky();     });
setInterval( () => {newGame.checkCollisionAll(); } ,50); //for every 50 milliseconds, check if the plane is colided






