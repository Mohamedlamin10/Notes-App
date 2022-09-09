import React from "react";

const Noteform=(props)=>{
const { formTitle,title,content,toltleChanged, contentChanged, submitCliked,submitText}=props;

return  (
<div>
              <h2>{formTitle}</h2>
         <div>  
                <input
                    type="text"
                    name="title"
                    className="form-input mb-30"
                    placeholder="العنوان"
                    value={title}
                    onChange={toltleChanged}
                />

                <textarea
                    rows="10"
                    name="content"
                    className="form-input"
                    placeholder="النص"
                    value={content}
                    onChange={contentChanged}
                    /*  ويعيد هذا الحدث كائن يعيد القيمة المدخلة في الحقل 
                    يطلق هذا الحدث عند الكتابة في الحقول النصية onChange */
                />
                <a href="#" className="button green" onClick={submitCliked}>{submitText}</a>

      </div>
</div>
    



)
}
export default Noteform;