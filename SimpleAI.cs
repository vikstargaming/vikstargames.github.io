using UnityEngine;

public class SimpleAI : MonoBehaviour
{
    public Transform ball;
    public float speed = 4f;
    public Rigidbody rb;

    void FixedUpdate()
    {
        Vector3 dir = (ball.position - transform.position).normalized;
        rb.MovePosition(rb.position + dir * speed * Time.fixedDeltaTime);
    }
}
