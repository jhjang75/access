//Calculator 클래스 만들고 인스턴스 생성
class Calculator{
  constructor(displayElement){//constructor에서도 clear 메서드를 호출하도록 수정
    this.displayElement=displayElement
    //2+ 를 입력하고 다시 연산자를 선택하면 입력되는 걸 막기 위해
    //연산자 선택 여부를 관리하는 operatorCheck 속성을 추가
    this.operatorCheck=true//연산자 선택 여부 추가
    this.equalsCheck=false//=버튼 클릭 여부 관리
    this.clear()
    //this.displayContent=''
  }
  //숫자 버튼을 클릭할 때마다 displayContent 속성에 숫자가 추가되고
  //input에도 표시되도록 appendNumber, updateDisplay 메서드 추가
  //switch문의 default에서 추가한 메서드 호출
  appendNumber(number){
    if(this.equalsCheck){
      this.displayContent=number//새로운 식 입력
      this.equalsCheck=false
    }else {
      this.displayContent+=number//기존 식에 추가
    }
    this.operatorCheck=false//숫자 입력시 false
  }
  //클래스에 appendOperator 메서드 추가 후 연산자 버튼 클릭 시 호출되도록 연결
  appendOperator(operator){
    if(this.operatorCheck) return false//operatorCheck 값이 true면 함수 빠져 나가기
    if(this.equalsCheck) this.equalsCheck=false//추가
    this.displayContent+=operator
    this.operatorCheck=true//연산자 입력시 true
  }
  updateDisplay(){
    this.displayElement.value=this.displayContent
  }
  //AC 버튼을 클릭하면 입력했던 것이 초기화되도록
  //클래스에 clear 메서드 추가 후 AC 버튼과 연결
  clear(){
    this.displayContent=''
    this.displayElement.value=0
    this.operatorCheck=true
  }
  //클래스에 compute 메서드를 추가하고 eval() 함수를 사용해서 계산 기능 구현
  compute(){
    if(this.operatorCheck) return//추가
    this.displayContent=eval(this.displayContent
      //자바스크립트에서는 곱하기와 나누기가 ×, ÷가 아닌 *, / 를 사용하므로
      //replace를 사용하여 × -> *로, ÷ -> / 로 변경해준 후 계산
      .replace('\u00D7','*')
      .replace('\u00F7','/')
    )
    this.equalsCheck=true
  }
}
//버튼과 input 태그를 가져와서 변수에 담기
const buttons=document.querySelectorAll('button')
const displayElement=document.querySelector('input')

const calculator=new Calculator(displayElement)
//addEventListener로 모든 버튼에 클릭 이벤트를 연결하고
//switch문으로 data-type에 따라 버튼 구분
buttons.forEach(button=>{
  button.addEventListener('click',()=>{
    switch(button.dataset.type){
      case 'operator':
        if(calculator.appendOperator(button.innerText)){
          calculator.updateDisplay()
        }
        //console.log('operator')
        break
      case 'ac':
        calculator.clear()
        //console.log('ac')
        break
      case 'equals':
      //= 버튼 클릭 시 compute 메서드를 호출하도록 연결
        calculator.compute()
        calculator.updateDisplay()
        //console.log('equals')
        break
      default:
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
      //console.log('number')
        break
    }
  })
})
