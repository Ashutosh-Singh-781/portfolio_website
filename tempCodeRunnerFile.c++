#include<iostream>
using namespace std;
class student{
    public:
    int reg;
};
int main(){
    student s1,s2,s3;
    cin>>s1.reg>>s2.reg>>s3.reg;
    for(int i=0; i < s3.reg; i++){
        cout<<s1.reg<<" "<<s2.reg<<" "<<s3.reg<<endl;
    }
    return 0;

}