function sum(x:number,y:number) : number{
    return x+y;
}

sum(1,2);

function sumArray(numbers:number[]) : number {
    return numbers.reduce((acc,current)=>acc+current,0);
}

const total=sumArray([1,2,3,4,5]);

function returnNothing(): void {
    console.log('ASDFASDF');
}





interface Shape {
    getArea() : number;
}

class Circle implements Shape {
    radius : number;

    constructor(radius:number) {this.radius=radius;}

    getArea(): number {
        return this.radius*this.radius*Math.PI;
    }

}

class Rectangle implements Shape {
    width: number;
    height: number;
    
    constructor(width:number, height:number) {
        this.width=width;
        this.height=height;
    }


    getArea(): number {
        return this.width*this.height;
    }

}

const shapes:Shape[]=[new Circle(5), new Rectangle(5,10)];
shapes.forEach(shape=>{console.log(shape.getArea());});
/* 정상 출력됨 */

/* 여기서  생성자에서 
  constructor(public radius: number) {
    this.radius = radius;
  } 뭐 이런 식으로 파라미터 타입 앞에 public 또는 private 써주면, 
   이후 getArea() 등 (인터페이스에서 타입 지정했음에도)다른 곳에서 타입 써주지 않아도 됨
*/


interface Person {
    name: string;
    age?: number; //optional과 같은.. 없어도 ㄱㅊ
}

interface Developer extends Person {
    skills: string[]
}

const person: Person = {
    name: '김사람',
    age: 20
}

const expert : Developer = {
    name: '김개발',
    skills: ['javascript', 'react']
}

const people : Person[] = [person, expert];

/* 즉 인터페이스-클래스는 implements, 인터페이스-인터페이스는 extends */
/* 반면 자바의 경우, 인터페이스-클래스 관계에서 implements 쓰는건 동일하나 
extends는 클래스-클래스 간에 사용한다. + 아니 마찬가지로 인터페이스-인터페이스 간에도 사용한다. 
다시 말해 언어 불문하고, extends는 같은 계통끼리, implements 는 다른 계통끼리... */

/* type : 특정 타입에 별칭 붙일 때 사용.  */
type Person2= {
    name: string;
    age?: number;
}

/* 타입 합치기 */
type Developer2= Person2 & {
    skills: string[];
};

const person2 : Person2 = {
    name: '김사람'
};

const expert2 : Developer2 = {
    name: '김개발',
    skills : ['js', 'react']
};

type People2=Person2[]; // Person2[]를 People2라는 타입으로 사용하겠다는 의미
const people2 : People2 = [person2, expert2];

type Color='red'|'orange'|'yellow';
const color : Color = 'red';
const colors: Color[]=['red','orange'];


/* 인자로 어떤 값이 올지 모르지만 일단 들어오면 해당 인자로 타입을 통일하고 싶을 떄 : 제네릭 사용 */
function wrap<T>(param:T) {
    return {param}
}
let wrapped=wrap(10);
/* 일케 넣으면 wrapped의 param : number가 되는 것 */
wrapped=wrap(2); //가능
/*  wrapped=wrap('a'); 불가 */

const wa=wrap('a');
/* 일케하면 string이 되고.. */

interface Items<T> {
    list: T[];
}

const items: Items<string> = {
    list: ['a', 'b' ,'c'],
    /* 만일 이걸 list: ['a', 'b' ,1] 이렇게 하려고 했다면 오류 */
};

class Queue<T> {
    list: T[] = [];

    get length() {
        return this.list.length;
    }
    enqueue(item:T) {
        this.list.push(item);
    }
    dequeue() {
        return this.list.shift();
    }
}

    const queue = new Queue<number>();
    queue.enqueue(0);
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    queue.enqueue(4);
    console.log(queue.dequeue());
    console.log(queue.dequeue());
    console.log(queue.dequeue());
    console.log(queue.dequeue());
    console.log(queue.dequeue());
    