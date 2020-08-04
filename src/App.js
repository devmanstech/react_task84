import React, {useEffect} from 'react';
import Header from "./Header";
import get_host_id from './Assets/img/get_host_id.jpg'
import eculp_ini from './Assets/img/eculp_ini.jpg'

function App() {
    return (
        <>
            <div className="wrapper-all-except-footer center-footer">
                <Header />
                <div className="wrapper-container">
                    <h1>Request Access</h1>
                    <form id="request_access">
                        <h2>Overview</h2>
                        <section>
                            <div id="Overview" className="panel">
                                <h3>Overview</h3>
                                <p><b>On January 4, 2016, the Focus Tools website migrated to a new webserver.</b> As part
                                    of this migration, security access is now managed differently and the changes are worth
                                    noting:</p>
                                <ul className="pad-left">
                                    <li type="square">Download access on the Focus Tools website is now managed by Active
                                        Directory (AD) groups and no longer managed per individual RACF UserID.
                                    </li>
                                    <li type="square">We expect this to make security maintenance easier in the long run.
                                        Instead of granting individuals access, we can now grant access by team or other
                                        functional AD group.
                                    </li>
                                </ul>
                                <p>In order to request a license file and/or download access, please use the interactive
                                    request form below.</p>
                                <br/>
                                {/*Browser Caution Message*/}
                                <dl className="alert caution" style={{paddingRight:20}}>
                                    <dd>Note that this is an interactive request form which is designed to show and hide
                                        content based on your responses. We have had reports of this form not
                                        functioning correctly with certain web browsers. <b>We suggest using Google
                                            Chrome and making sure that Javascript is enabled.</b></dd>
                                </dl>
                            </div>

                        </section>

                        <h2>User Info</h2>
                        <section>
                            <div id="User Info" className="panel">
                                <h3>User Info</h3>
                                <div className="col-1-2">
                                    <div className="input-box">
                                        <label htmlFor="user_name">Name<span className="req"></span></label>
                                        <input name="user_name" id="user_name" className="" type="text" spellCheck="false"/>
                                    </div>
                                    <div className="input-box">
                                        <label htmlFor="racf">RACF ID<span className="req"></span></label>
                                        <input name="racf" id="racf" className="" type="text" spellCheck="false"/>
                                    </div>
                                </div>
                                <div className="col-1-2">
                                    <div className="input-box pad-left">
                                        <label>What are you requesting?<span className="req"></span></label>
                                        <ul id="request_type" className="radio-list vertical clear-bottom-margin">
                                            <li><input type="radio" name="request_type" value="Download Access"
                                                       required/><label></label>
                                                <div>Download Access</div>
                                            </li>
                                            <li><input type="radio" name="request_type" value="License"/><label></label>
                                                <div>License Request</div>
                                            </li>
                                            <li><input type="radio" name="request_type"
                                                       value="Download Access and License"/><label></label>
                                                <div>Both</div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <h2>Machine Info</h2>
                        <section>
                            <div id="Machine Info" className="panel">
                                <h3>Machine Info</h3>
                                <div className="row">
                                    <div className="col-1-2">
                                        <div className="input-box">
                                            <label htmlFor="hostid">Host ID<span className="req"></span></label>
                                            <input name="hostid" id="hostid" className="clear-bottom" type="text"
                                                   spellCheck="false"/>
                                        </div>
                                    </div>
                                    <div className="col-1-2">
                                        <div className="input-box pad-left">
                                            <label>What type of machine will this license be for?</label>
                                            <ul id="license_usage" className="radio-list vertical clear-bottom-margin">
                                                <li><input type="radio" name="license_usage" value="Personal Laptop" defaultChecked
                                                />
                                                <label></label>
                                                    <div>Personal Laptop</div>
                                                </li>
                                                <li><input type="radio" name="license_usage"
                                                           value="Test Cell / Shop Floor"/><label></label>
                                                    <div>Test Cell / Shop Floor</div>
                                                </li>
                                                <li><input type="radio" name="license_usage" value="Other"/><label></label>
                                                    <div>Other</div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-1-1">
                                        <div className="steps-aware-accordion closed">
                                            <div className="steps-aware-title"><b>Instructions for reading your computer's
                                                Host
                                                ID with GetHostID.exe</b></div>
                                            <div className="steps-aware-body">
                                                <p>In order to read your computer's Host ID, please download and run the
                                                    Windows <a
                                                        href="../../downloads/GetHostID.exe">GetHostID.exe</a> program. Copy
                                                    and paste the resulting Host ID value into the text field above.</p>
                                                <img src={get_host_id}
                                                     style={{width: '50%',height: '50%', border:'none'}}
                                                     alt="img/get_host_id.jpg"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-1-1">
                                        <div className="steps-aware-accordion closed">
                                            <div className="steps-aware-title"><b>Instructions for reading your computer's
                                                Host
                                                ID with ECULP</b></div>
                                            <div className="steps-aware-body">
                                                <p>In order to read your computer's Host ID, run the EcuLpIniConfig located
                                                    at one of the following locations:</p>
                                                <p className="pad-left"><b>32-bit Machine:</b> C:\Program
                                                    Files\ECULP\ECULPINIConfig.exe</p>
                                                <p className="pad-left"><b>64-bit Machine:</b> C:\Program Files
                                                    (x86)\ECULP\ECULPINIConfig.exe</p>
                                                <p>Go to the security tab of the program. The Host ID will be displayed in
                                                    the upper box and the current JDLM license status will be displayed in
                                                    the lower box.</p>
                                                <img src={eculp_ini} style={{width: '75%', height: '75%', border:'none'}} alt="img/eculp_ini.jpg"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <h2>Department Info</h2>
                        <section>
                            <div className="panel" id="department_info">
                                <h3>Department Info</h3>
                                <div className="row">
                                    <div className="col-1-1">
                                        <p>In order to receive the proper access to the FOCUS Tools website in a timely
                                            manner, it is very important that you answer the following questions to the best
                                            of your knowledge.</p>
                                        <br/>
                                        <h5>General Questions:</h5>

                                        <div>
                                            <ul className="radio-list horizontal clear-bottom-margin" id="focus-jdps">
                                                <p><b>Are you a member of FOCUS Engine Controls or JDPS Engine
                                                    Engineering?</b></p>
                                                <li><input type="radio" name="focus_member" describe="JDPS/FOCUS Member"
                                                           value="Yes"
                                                           id={"svn_show"}
                                                />
                                                    <label></label>
                                                    <div
                                                        id={"svn_show"}
                                                    >Yes
                                                    </div>
                                                </li>
                                                <li><input type="radio" name="focus_member" describe="Not in JDPS/FOCUS"
                                                           value="No"
                                                           defaultChecked
                                                           id={"svn_hide"}
                                                />
                                                    <label>
                                                    </label>
                                                    <div
                                                        id={"svn_hide"}
                                                    >No
                                                    </div>
                                                </li>
                                                <li id="svnaccess" style={{display:'none'}}><input type="checkbox"
                                                                                                   id="svn_access"
                                                                                                   value="Needs Repository Access"/><label></label>
                                                    <div className="check-label">I need FOCUS SVN Repository Access</div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <br/>
                                            <p htmlFor="business_unit"><b>Using the drop down list, select you business
                                                unit/location.</b></p>
                                            <select type="dropdown" name="business_unit" id="businessunit" required>
                                                <option disabled hidden defaultValue='' />
                                                <option value="Other/Not Listed">Other/Not Listed</option>
                                                <option value="Custom Performance (JDCP)">Custom Performance (JDCP)</option>
                                                <option value="Drivetrain Operations">Drivetrain Operations</option>
                                                <option value="Dubuque Works">Dubuque Works</option>
                                                <option value="Electronic Solutions (JDES)">Electronic Solutions</option>
                                                <option value="Engine Works">Engine Works</option>
                                                <option value="Foundry Operations">Foundry Operations</option>
                                                <option value="Harvester Works">Harvester Works</option>
                                                <option value="Intelligent Solutions Group (ISG)">Intelligent Solutions
                                                    Group (ISG)
                                                </option>
                                                <option value="Product Engineering Center (PEC)">Product Engineering Center
                                                    (PEC)
                                                </option>
                                                <option value="Technology Center-India (TCI)">Technology Center-India
                                                    (TCI)
                                                </option>
                                                <option value="Tractor, Cab, and Assy. Ops. (TCAO)">Tractor, Cab, and Assy.
                                                    Ops. (TCAO)
                                                </option>
                                                <option value="Argentina S.A.">Argentina S.A.</option>
                                                <option value="Brazil Ltda.">Brazil Ltda.</option>
                                                <option value="Cary">Cary</option>
                                                <option value="Coffeyville Works Inc.">Coffeyville Works Inc.</option>
                                                <option value="Construction & Forestry Company">Construction & Forestry
                                                    Company
                                                </option>
                                                <option value="Cylinder Internal Platform">Cylinder Internal Platform
                                                </option>
                                                <option value="Davenport Works">Davenport Works</option>
                                                <option value="Deere-Hitachi">Deere-Hitachi</option>
                                                <option value="Des Moines Works">Des Moines Works</option>
                                                <option value="Financial">Financial</option>
                                                <option value="Forestry Ltd.">Forestry Ltd.</option>
                                                <option value="GambH & Co. KG">GambH & Co. KG</option>
                                                <option value="Horicon Works">Horicon Works</option>
                                                <option value="India Pvt. Ltd.">India Pvt. Ltd.</option>
                                                <option value="Intelligent Vehicle Systems">Intelligent Vehicle Systems
                                                </option>
                                                <option value="Mannheim">Mannheim</option>
                                                <option value="Olathe">Olathe</option>
                                                <option value="Ottumwa Works">Ottumwa Works</option>
                                                <option value="Paton">Paton</option>
                                                <option value="Reman">Reman</option>
                                                <option value="Rosario">Rosario</option>
                                                <option value="Seeding Group">Seeding Group</option>
                                                <option value="Silvis">Silvis</option>
                                                <option value="Thibodaux">Thibodaux</option>
                                                <option value="Tianjin">Tianjin</option>
                                                <option value="Usine d'Arc-les-Gray">Usine d'Arc-les-Gray</option>
                                                <option value="Usine Saran">Usine Saran</option>
                                                <option value="World Headquarters">World Headquarters</option>
                                                <option value="Zweibruecken">Zweibruecken</option>
                                            </select>
                                        </div>

                                        <div>
                                            <br/>
                                            <p><b>What group are you in and what type of work do you do?</b></p>
                                            <textarea id="group_description" name="group_description" style={{height:'5em'}}
                                                      required/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <h2>Tool Info</h2>
                        <section>
                            <div id="toolinfo" className="panel">
                                <h3>Tool Info</h3>
                                <p>Using the checkboxes below, please tell us which FOCUS Tools you are needing access
                                    to.</p>
                                <div className="row">
                                    <div className="col-1-2">
                                        <ul className="thin-list clear-bottom-margin">
                                            <li><input type="checkbox" id="ecsuite" value="EcSuite"/><label></label>
                                                <div className="check-label">EcSuite</div>
                                            </li>
                                            <li><input type="checkbox" id="ecucpp" value="ECUCPP"/><label></label>
                                                <div className="check-label">ECUCPP</div>
                                            </li>
                                            <li><input type="checkbox" id="eculp" value="ECULP"/><label></label>
                                                <div className="check-label">ECULP</div>
                                            </li>
                                            <li><input type="checkbox" id="ecuprogrammer"
                                                       value="ECU Programmer"/><label></label>
                                                <div className="check-label">ECUProgrammer</div>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="col-1-2">
                                        <ul className="thin-list clear-bottom-margin">
                                            <li><input type="checkbox" id="devx" value="DevX"/><label></label>
                                                <div className="check-label">DevX/CANard</div>
                                            </li>
                                            <li><input type="checkbox" id="omnical" value="OmniCal"/><label></label>
                                                <div className="check-label">OmniCal</div>
                                            </li>
                                            <li><input type="checkbox" id="payloadviewer"
                                                       value="PayloadViewer"/><label></label>
                                                <div className="check-label">PayloadViewer</div>
                                            </li>
                                            <li><input type="checkbox" id="trimconfig" value="Trim Config"/><label></label>
                                                <div className="check-label">TrimConfig</div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-1-1">
                                        <br/>
                                        <div className="input-box">
                                            <label htmlFor="other">Other:
                                                <div className="subtext">(Please specify)</div>
                                            </label>
                                            <input id="other_request" className="clear-bottom" type="text"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-1-1">
                                        <h3>Business Case</h3>
                                        <p>Please briefly outline your business case or need for using our tools.</p>
                                        <ul className="pad-left">
                                            <li type="square">What tools are you using and why?</li>
                                            <li type="square">What type of work are you doing?</li>
                                            <li type="square">What functionality do you need?</li>
                                        </ul>
                                        <p className="pad-bottom"><b>NOTE: You will have to outline your business case or
                                            need for using
                                            each of
                                            our tools.</b> Some tools are more restricted outside of FOCUS Engine
                                            Engineering, and
                                            additional usage information might be required.</p>
                                        <div className="input-box clear-bottom">
                                        <textarea id="business_case" name="business_case" style={{height:'10em'}}
                                                  required/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <h2>Comments</h2>
                        <section>
                            <div className="panel" id="comments">
                                <div className="row">
                                    <div className="col-1-1">
                                        <h3>Comments</h3>
                                        <p className="pad-bottom">Do you have any additional comments, questions, or
                                            concerns related to
                                            this
                                            request that we should be aware of?</p>
                                        <div className="input-box clear-bottom">
                                            <textarea id="additional_comments" style={{height:'10em'}}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <h2>Confirm</h2>
                        <section>
                            <div className="panel" id="Confirm">
                                <div className="row">
                                    <div className="col-1-1">
                                        <h3>Confirm</h3>
                                        <p>Please take a few moment to review the details of your license request. When
                                            satisfied, click the
                                            'Finish' button to submit your report request. </p>
                                        <pre id="license_request"/>
                                        <dl className="alert error" id="Error" style={{paddingRight:20}}>
                                            <dt>Access Request submission failed!</dt>
                                            <dd>The 'finish' button on this request form is designed to automatically format
                                                and send the
                                                summary content in an email message. It appears you are having issues with
                                                finishing the
                                                interactive request form, please manually submit your information to JDPS
                                                ECULP using the
                                                following guidelines:<br/><br/></dd>
                                            <dd>&nbsp;&nbsp;&nbsp;&nbsp;-Copy and paste the summary content above into the
                                                body of an
                                                email<br/></dd>
                                            <dd>&nbsp;&nbsp;&nbsp;&nbsp;-Mail to JDPS ECULP
                                                "GoogleInternal@GoogleInternal.com"<br/></dd>
                                            <dd id="subject_line"/>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </form>
                </div>
                <div className="push"/>
            </div>
            <div className="footer center-footer">
                <div className="wrapper-container">
                    <span className="footer-links"><a href="#">Home</a> | <a href="#">Feedback</a> | <a
                        href="#">Help</a> | <a href="#">FAQs</a> | <a href="#">Training</a></span>
                    <span className="footer-legal">Copyright &copy 2015 GoogleInternal &amp; Company. All Rights Reserved.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <a href="#">Privacy &amp; Data</a> | <a href="https://www.GoogleInternal.com/">Legal</a> </span>
                </div>
            </div>
        </>
    );
}

export default App;
