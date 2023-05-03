using BCrypt;

namespace Program{


	public static class App{
	
		public static void Main(){
			string password = "$2b$12$mb/tpPRgOpKvc6n4xAapButZQnc0LTGO.6vqdx.zmnWNKNnoEylRK";
			if(BCrypt.Net.BCrypt.Verify(password, "parola") == false){
				Console.Writeline("false");
			}
			else{
				Console.Writeline("true");
			}
		
		}
	}
}
