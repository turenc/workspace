package day26.cn.leo.reflect.with;
public class NoteBook {

    public void run() {
        System.out.println("notebook run");
    }

    public void use(USB usb) {
        if (usb != null) {
            usb.open();
            usb.close();
        }
    }
}
