import MyButton from '../components/MyButton';

const Home = () => {
    return (<div>
        <h1>Home</h1>
        <p>This is home</p>
        <h2>hello react</h2> 
      <MyButton
      text={"Button"}
      onClick = {() => alert("click button")}
      type={"positive"}
      />
    </div>
    );
};

export default Home;